<?php
namespace App\Service;

use App\Entity\Orders;
use App\Service\ApiManager\ApiManagerInterface;

class InfoService
{
    /**
     * @var
     */
    private $locale;

    /**
     * @var
     */
    private $method;

    /**
     * @var array
     */
    private $params = [];

    /**
     * @var ApiManagerInterface
     */
    private $externalService;

    public function __construct(ApiManagerInterface $externalService)
    {
        $this->externalService = $externalService;
    }

    /**
     * @return $this
     */
    private function getMethod()
    {
        return $this->method;
    }

    /**
     * @param $method
     * @return $this
     */
    private function setMethod($method)
    {
        $this->method = $method;
        return $this;
    }

    /**
     * @return array
     */
    private function getParams()
    {
        return $this->params;
    }

    /**
     * @return mixed
     */
    private function getLocale()
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

    /**
     * @param $params
     * @return $this
     */
    private function setParams($params)
    {
        $this->params = array_merge(['locale' => $this->getLocale()], $params);
        return $this;
    }

    public function getPaymentInfo(Orders $order)
    {
        return $this->setMethod('payment/info')
            ->setParams(['payment' => $order->getExternalPaymentCode()])
            ->getData();
    }

    public function getDeliveryInfo(Orders $order)
    {
        return $this->setMethod('delivery/info')
            ->setParams(['delivery' => $order->getExternalDeliveryCode()])
            ->getData();
    }

    public function getData()
    {
        return $this->externalService
            ->setMethod($this->getMethod())
            ->setParams($this->getParams())
            ->getData();
    }
}