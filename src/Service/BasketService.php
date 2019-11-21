<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Redis;
use Doctrine\ORM\EntityManager;
use App\Service\Image\GeneratorService;

class BasketService extends AbstractController
{
    private $authKey;

    private $locale;

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
        GeneratorService $generatorService
    ) {
        $this->em = $em;
        $this->redis = $redis;
        $this->imageGenerator = $generatorService;
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

    public function add(int $itemId)
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
                $productItem = $this->em
                    ->getRepository('App:ProductItem')
                    ->find($basketItem['item_id']);
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

    public function update(int $itemId, int $qty)
    {
        if($authKey = $this->getAuthKey()) {
            $key       = 'basket::' . $this->getAuthKey();
            $basket = json_decode($this->redis->get($key), true);
            if(isset($basket[$itemId])) {
                $basket[$itemId]['qty'] = $qty;
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
                    $productItem = $this->em
                        ->getRepository('App:ProductItem')
                        ->find($basketItem['item_id']);

                    if($productItem) {

                        $productItem->setCurrentLocale($this->getLocale());

                        $images = [];

                        $config = $this->em->getRepository('App:ImageType')
                            ->findAll();

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