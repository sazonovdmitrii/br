<?php

namespace App\Command\FeedData;

use App\Service\ConfigService;
use App\Service\EnvService;
use Vitalybaev\GoogleMerchant\Product\Availability\Availability;
use Vitalybaev\GoogleMerchant\Product\Condition;

/**
 * Class FeedDataAbstract
 *
 * @package App\Command\FeedData
 */
class FeedDataAbstract
{
    /**
     * @var
     */
    private $product;

    /**
     * @var array
     */
    private $data;
    /**
     * @var ConfigService
     */
    private $configService;
    /**
     * @var EnvService
     */
    private $envService;

    /**
     * FeedDataAbstract constructor.
     *
     * @param ConfigService $configService
     */
    public function __construct(
        ConfigService $configService,
        EnvService $envService
    ) {
        $this->configService = $configService;
        $this->envService = $envService;
    }

    /**
     * @return mixed
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * @param $product
     * @return $this
     */
    public function setProduct($product)
    {
        $this->product = $product;
        return $this;
    }

    /**
     * @return array
     */
    public function getData()
    {
        $product = $this->getProduct();

        $this->data = [
            'id' => $product->getId(),
            'title' => $product->getName(),
            'description' => strip_tags($product->getDescription()),
            'image' => $this->envService->getDomain() . $product->getMainImage(),
            'availability' => Availability::IN_STOCK,
            'price' => $product->getMainPrice(),
            'google_category' => $product->getTagValue($this->configService->get('tag_gm')),
            'brand' => $product->getTagValue($this->configService->get('brand_tag')),
            'gtin' => $product->getGtin(),
            'condition' => Condition::NEW_PRODUCT,
            'link' => $this->envService->getDomain('/') . $product->getMainLink()
        ];

        return $this->data;
    }

    /**
     * @param $data
     * @return $this
     */
    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }
}