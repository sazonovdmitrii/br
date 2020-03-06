<?php

namespace App\Lp\PaymentBundle\Service;
use App\Lp\PaymentBundle\Service\PaymentInterface;

/**
 * Class Payment
 *
 * @package App\Lp\PaymentBundle\Service
 */
class Payment implements PaymentInterface
{
    /**
     * @return mixed
     */
    public function getPaymentLink($methodCode)
    {
        if($paymentMethod = $this->getPaymentMethod($methodCode)) {
            return $paymentMethod->getPaymentLink();
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
}