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
    private $item;

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
    public function getItem()
    {
        return $this->item;
    }

    /**
     * @param $item
     * @return $this
     */
    public function setItem($item)
    {
        $this->item = $item;
        return $this;
    }

    /**
     * @return array
     */
    public function getData()
    {
        $item = $this->getItem();
        $this->data = [];

        if($item->getProduct()) {
            $this->data = [
                'id' => $item->getId(),
                'title' => $item->getGoogleTitle(),
                'description' => strip_tags($item->getGoogleDescription()),
                'image' => $this->envService->getDomain() . $item->getProduct()->getMainImage(),
                'availability' => Availability::IN_STOCK,
                'price' => $item->getProduct()->getMainPrice(),
                'google_category' => $item->getProduct()->getTagValue($this->configService->get('tag_gm')),
                'brand' => $item->getProduct()->getTagValue($this->configService->get('brand_tag')),
                'gtin' => $item->getProduct()->getGtin(),
                'condition' => Condition::NEW_PRODUCT,
                'link' => $this->envService->getDomain('/') . $item->getProduct()->getMainLink()
            ];
        }

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