<?php

namespace App\Service;

use App\Repository\ProductItemRepository;

class CouponService
{
    /**
     * @var ProductItemRepository
     */
    private $productItemRepository;

    public function __construct(ProductItemRepository $productItemRepository)
    {
        $this->productItemRepository = $productItemRepository;
    }

    /**
     * @var
     */
    private $basket;

    /**
     * @var
     */
    private $coupon;

    /**
     * @return mixed
     */
    public function getBasket()
    {
        return $this->basket;
    }

    /**
     * @param $basket
     * @return $this
     */
    public function setBasket($basket)
    {
        $this->basket = $basket;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCoupon()
    {
        return $this->coupon;
    }

    /**
     * @param $coupon
     * @return $this
     */
    public function setCoupon($coupon)
    {
        $this->coupon = $coupon;
        return $this;
    }

    /**
     * @return mixed
     */
    public function apply()
    {
        $basket = $this->getBasket();

        $basket['coupon'] = $this->getCoupon()->getCode();

        foreach ($basket['products'] as &$product) {

            $salePercent = intval($this->getCoupon()->getPercent());

            if ($salePercent) {
                $product['coupon_price'] = $product['price'] / 100 * (100 - $salePercent);
            }
        }

        return $basket;
    }
}