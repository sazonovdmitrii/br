<?php

namespace App\Service;

use App\Entity\Coupon;
use App\Entity\Coupons;
use App\Repository\ImageTypeRepository;
use App\Repository\ProductItemRepository;
use App\Repository\ProductRepository;
use App\Service\Image\GeneratorService;
use Doctrine\ORM\EntityManager;
use GraphQL\Error\UserError;
use Redis;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BasketService extends AbstractController
{
    const BASKET_KEY = 'basket';

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
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * @var Coupons
     */
    private $coupon;
    /**
     * @var CouponService
     */
    private $couponService;

    /**
     * @return mixed
     */
    public function getLocale()
    {
        return $this->locale;
    }

    /**
     * @return mixed
     */
    public function getCoupon()
    {
        return $this->coupon;
    }

    /**
     * @param Coupons $coupon
     * @return $this
     */
    public function setCoupon(Coupons $coupon)
    {
        $this->coupon = $coupon;
        return $this;
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

    /**
     * BasketService constructor.
     *
     * @param EntityManager $em
     * @param Redis $redis
     * @param GeneratorService $generatorService
     * @param LenseService $lenseService
     * @param ProductItemRepository $productItemRepository
     * @param ProductRepository $productRepository
     * @param ImageTypeRepository $imageTypeRepository
     * @param CouponService $couponService
     */
    public function __construct(
        EntityManager $em,
        Redis $redis,
        GeneratorService $generatorService,
        LenseService $lenseService,
        ProductItemRepository $productItemRepository,
        ProductRepository $productRepository,
        ImageTypeRepository $imageTypeRepository,
        CouponService $couponService
    ) {
        $this->em                    = $em;
        $this->redis                 = $redis;
        $this->imageGenerator        = $generatorService;
        $this->lenseService          = $lenseService;
        $this->productItemRepository = $productItemRepository;
        $this->imageTypeRepository   = $imageTypeRepository;
        $this->productRepository     = $productRepository;
        $this->couponService         = $couponService;
    }

    /**
     * @param string $authKey
     * @return $thiss
     */
    public function setAuthKey(string $authKey)
    {
        $this->authKey = $authKey;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAuthKey()
    {
        return $this->authKey;
    }

    /**
     * @param int $itemId
     * @param $lenses
     * @return array
     */
    public function add($itemId, $lenses)
    {
        $productItem = $this->productItemRepository->find($itemId);

        if (!$productItem) {
            throw new UserError('Товара не существует');
        }

        $basket = $this->_getCurrentBasket();

        if ($basket) {
            $products = (isset($basket['products']) && gettype($basket['products']) == 'array') ? $basket['products'] : [];

            if (!isset($products[$itemId])) {
                $products[$itemId] = [
                    'item_id' => $itemId,
                    'qty'     => 1,
                    'price'   => $productItem->getPrice()
                ];
            } else {
                $products[$itemId]['qty'] += 1;
            }
        } else {
            $products[$itemId] = [
                'item_id' => $itemId,
                'qty'     => 1,
                'price'   => $productItem->getPrice()
            ];
        }

        $products[$itemId]['lenses'] = $lenses;

        $basket['products'] = $products;

        $this->_updateBasket($basket);

        return $this->getAll();
    }

    /**
     * @param int $itemId
     * @return array
     */
    public function remove($itemId)
    {
        $basket = $this->_getCurrentBasket();

        $products = (isset($basket['products'])) ?: [];

        if (isset($products[$itemId])) {
            unset($products[$itemId]);
        }

        $basket['products'] = $products;

        $this->_updateBasket($basket);

        return $this->getAll();
    }

    public function update($itemId, $qty, $lenses = [], $recipe = [])
    {
        $basket = $this->_getCurrentBasket();

        $products = (isset($basket['products'])) ?: [];

        if (isset($products[$itemId])) {
            $products[$itemId]['qty'] = $qty;
            if (count($lenses)) {
                $products[$itemId]['lenses'] = $lenses;
            }
            if (count($recipe)) {
                $products[$itemId]['recipe'] = $recipe;
            }
        }

        $basket['products'] = $products;

        $this->_updateBasket($basket);

        return $this->getAll();
    }

    public function getAll()
    {
        $basket = $this->_getCurrentBasket();

        if ($basket) {
            
            $result = [];

            if(!isset($basket['products'])) {
                $basket['products'] = [];
            }
            $result['products'] = [];
            foreach ($basket['products'] as $basketItem) {

                $productItem = $this->productItemRepository->find($basketItem['item_id']);

                if ($productItem) {

                    $productItem->setCurrentLocale($this->getLocale());

                    $product = $this->productRepository
                        ->find($productItem->getProduct()->getId());

                    $product->setCurrentLocale($this->getLocale());

                    $images = [];

                    $config = $this->imageTypeRepository->findAll();

                    foreach ($productItem->getProductItemImages() as $image) {

                        $images[] = $this->imageGenerator
                            ->setImage($image)
                            ->setTypes(['original', 'webp'])
                            ->setConfig($config)
                            ->getAll();

                    }

                    $productItem->setImages($images);
                    $lenses               = (isset($basketItem['lenses'])) ? $basketItem['lenses'] : [];
                    $result['products'][] = [
                        'item'         => $productItem,
                        'qty'          => $basketItem['qty'],
                        'name'         => $product->getName(),
                        'url'          => '/' . $product->getProductUrls()[0]->getUrl(),
                        'price'        => $basketItem['price'],
                        'coupon_price' => isset($basketItem['coupon_price']) ? $basketItem['coupon_price'] : 0,
                        'lenses'       => $this->lenseService->parse($lenses)
                    ];
                }
            }

            if(isset($basket['coupon'])) $result['coupon'] = $basket['coupon'];

            return $result;
        }
        return [
            'products' => []
        ];
    }

    public function delete()
    {
        if ($authKey = $this->getAuthKey()) {
            $this->redis->delete(self::BASKET_KEY . '::' . $authKey);
        }
    }

    /**
     * @param $authKey
     * @param $userId
     * @return bool
     */
    public function updateCartForUser($authKey, $userId)
    {
        return $this->redis->set(
            self::BASKET_KEY . '::' . $userId, $this->redis->get(self::BASKET_KEY . '::' . $authKey)
        );
    }

    /**
     * @return array|mixed
     */
    private function _getCurrentBasket()
    {
        if ($authKey = $this->getAuthKey()) {
            return json_decode(
                $this->redis->get(self::BASKET_KEY . '::' . $authKey), true
            );
        }
        return [];
    }

    /**
     * @param $basket
     */
    private function _updateBasket($basket)
    {
        if ($basket) {
            $this->redis->set(
                self::BASKET_KEY . '::' . $this->getAuthKey(), json_encode($basket)
            );
        }
    }

    public function apply()
    {
        $basket = $this->_getCurrentBasket();

        if (!$basket) {
            throw new UserError(
                'В корзине нет товаров, к которым можно применить промокод ' . $this->getCoupon()->getCode()
            );
        }

        if (!isset($basket['coupon']) || $basket['coupon'] != $this->getCoupon()->getCode()) {

            $basket = $this->couponService
                ->setCoupon($this->getCoupon())
                ->setBasket($basket)
                ->apply();

            $this->_updateBasket($basket);
        }

        return $this;
    }
}