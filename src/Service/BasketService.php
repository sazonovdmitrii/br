<?php
namespace App\Service;
use App\Repository\ImageTypeRepository;
use App\Repository\ProductItemRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Redis;
use Doctrine\ORM\EntityManager;
use App\Service\Image\GeneratorService;

class BasketService extends AbstractController
{
    private $authKey;

    private $locale;

    private $lenseService;
    /**
     * @var ProductItemRepository
     */
    private $productItemRepository;
    /**
     * @var ImageTypeRepository
     */
    private $imageTypeRepository;

    /**
     * @return mixed
     */
    public function getLocale()
    {
        return $this->locale;
    }

    /**
     * @param $locale
     * @return $this
     */
    public function setLocale($locale)
    {
        $this->locale = $locale;
        return $this;
    }

    public function __construct(
        EntityManager $em,
        Redis $redis,
        GeneratorService $generatorService,
        LenseService $lenseService,
        ProductItemRepository $productItemRepository,
        ImageTypeRepository $imageTypeRepository
    ) {
        $this->em = $em;
        $this->redis = $redis;
        $this->imageGenerator = $generatorService;
        $this->lenseService = $lenseService;
        $this->productItemRepository = $productItemRepository;
        $this->imageTypeRepository = $imageTypeRepository;
    }

    public function setAuthKey(string $authKey)
    {
        $this->authKey = $authKey;
        return $this;
    }

    public function getAuthKey()
    {
        return $this->authKey;
    }

    public function add(int $itemId, $lenses)
    {
        if($authKey = $this->getAuthKey()) {
            $key = 'basket::' . $this->getAuthKey();
            $oldBasket = $this->redis->get($key);

            if($oldBasket) {
                $basket = json_decode($oldBasket, true);
                if(!is_array($basket)) {
                    $basket = [];
                }
                if(!isset($basket[$itemId])) {
                    $basket[$itemId] = [
                        'item_id' => $itemId,
                        'qty' => 1
                    ];
                } else {
                    $basket[$itemId]['qty'] += 1;
                }
            } else {
                $basket[$itemId] = [
                    'item_id' => $itemId,
                    'qty' => 1
                ];
            }

            $basket[$itemId]['lenses'] = $lenses;

            if($basket) {
                $this->redis->set($key, json_encode($basket));
            }
            return $this->getAll();
        }
        return [
            'products' => []
        ];
    }

    public function remove(int $itemId)
    {
        if($authKey = $this->getAuthKey()) {
            $key       = 'basket::' . $this->getAuthKey();
            $basket = json_decode($this->redis->get($key), true);
            if(isset($basket[$itemId])) {
                unset($basket[$itemId]);
            }
            $this->redis->set($key, json_encode($basket));
            foreach($basket as $basketItem) {

                $productItem = $this->productItemRepository->find($basketItem['item_id']);

                if($productItem && $productItem->getEntity()) {
                    $basket[$basketItem['item_id']] = array_merge(
                        $basketItem,
                        [
                            'name' => $productItem->getName(),
                            'product_name' => $productItem->getEntity()->getName(),
                            'price' => $productItem->getPrice()
                        ]
                    );
                }
            }
            return $this->getAll();
        }
        return [
            'products' => []
        ];
    }

    public function update(int $itemId, int $qty, $lenses = [], $recipe = [])
    {
        if($authKey = $this->getAuthKey()) {
            $key       = 'basket::' . $this->getAuthKey();
            $basket = json_decode($this->redis->get($key), true);
            if(isset($basket[$itemId])) {
                $basket[$itemId]['qty'] = $qty;
                if(count($lenses)) {
                    $basket[$itemId]['lenses'] = $lenses;
                }
                if(count($recipe)) {
                    $basket[$itemId]['recipe'] = $recipe;
                }
            }
            $this->redis->set($key, json_encode($basket));
            return $this->getAll();
        }
        return [
            'products' => []
        ];
    }

    public function getAll()
    {
        if($authKey = $this->getAuthKey()) {
            $key = 'basket::' . $this->getAuthKey();
            $basket = json_decode($this->redis->get($key), true);
            $result = [];
            if($basket) {
                foreach($basket as $basketItem) {
                    $productItem = $this->productItemRepository->find($basketItem['item_id']);

                    if($productItem) {

                        $productItem->setCurrentLocale($this->getLocale());

                        $images = [];

                        $config = $this->imageTypeRepository->findAll();

                        foreach($productItem->getProductItemImages() as $image) {

                            $images[] = $this->imageGenerator
                                ->setImage($image)
                                ->setTypes(['original', 'webp'])
                                ->setConfig($config)
                                ->getAll();

                        }

                        $productItem->setImages($images);

                        $result[] = [
                            'item' => $productItem,
                            'qty' => $basketItem['qty'],
                            'price' => $productItem->getPrice(),
                            'lenses' => $this->lenseService->parse(@$basketItem['lenses']),
                        ];
                    }
                }
                return ['products' => $result];
            }
        }
        return [
            'products' => []
        ];
    }

    public function delete()
    {
        if($authKey = $this->getAuthKey()) {
            $key = 'basket::' . $this->getAuthKey();
            $this->redis->delete($key);
        }
    }

    public function updateCartForUser($authKey, $userId)
    {
        if(!$this->redis->get('basket::' . $userId)) {
            return $this->redis->set('basket::' . $userId, $this->redis->get('basket::' . $authKey));
        }
    }
}