<?php

namespace App\Lp\PaymentBundle\Service;
use App\Lp\PaymentBundle\Service\PaymentInterface;
use App\Service\ConfigService;

/**
 * Class Payment
 *
 * @package App\Lp\PaymentBundle\Service
 */
class Payment implements PaymentInterface
{
    /**
     * @var ConfigService
     */
    private $configService;

    public function __construct(ConfigService $configService)
    {
        $this->configService = $configService;
    }

    /**
     * @var
     */
    private $order;

    /**
     * @return mixed
     */
    public function getPaymentLink()
    {
        $order = $this->getOrder();

        if($paymentMethod = $this->getPaymentMethod($order->getExternalPaymentCode())) {
            return $paymentMethod->setConfig($this->configService)->getPaymentLink($order);
        }

        return '';
    }

    /**
     * @param $methodCode
     * @return bool
     */
    public function getPaymentMethod($methodCode)
    {
        foreach (glob(__DIR__ . '/Methods/*.php') as $file)
        {
            require_once $file;
            $class = basename($file, '.php');
            $fileName = __NAMESPACE__ . '\\Methods\\' . $class;
            if (class_exists($fileName))
            {
                $paymentMethod = new $fileName;
                if(method_exists($paymentMethod, 'code') && $paymentMethod->code() == $methodCode)
                    return new $fileName;
            }
        }
        return false;
    }

    /**
     * @return mixed
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * @param $order
     * @return $this
     */
    public function setOrder($order)
    {
        $this->order = $order;
        return $this;
    }
}