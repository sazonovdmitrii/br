<?php

namespace App\Command\FeedData;

use App\Service\ConfigService;
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
     * FeedDataAbstract constructor.
     *
     * @param ConfigService $configService
     */
    public function __construct(ConfigService $configService)
    {

        $this->configService = $configService;
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
        $this->data = [
            'id' => $this->getProduct()->getId(),
            'title' => $this->getProduct()->getName(),
            'description' => $this->getProduct()->getDescription(),
            'image' => $this->getProduct()->getMainImage(),
            'availability' => Availability::IN_STOCK,
            'price' => $this->getProduct()->getMainPrice(),
            'google_category' => $this->getProduct()->getTagValue($this->configService->get('tag_gm')),
            'brand' => $this->getProduct()->getTagValue($this->configService->get('brand_tag')),
            'gtin' => $this->getProduct()->getGtin(),
            'condition' => Condition::NEW_PRODUCT,
            'link' => $this->getProduct()->getMainLink()
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