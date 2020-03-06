<?php

namespace App\Lp\PaymentBundle\Service;
use App\Lp\PaymentBundle\Service\PaymentInterface;

/**
 * Class Payment
 *
 * @package App\Lp\PaymentBundle\Service
 */
class Strategy implements PaymentInterface
{
    /**
     * @var \App\Lp\PaymentBundle\Service\PaymentInterface
     */
    private $strategy;

    public function __construct(PaymentInterface $strategy)
    {
        $this->strategy = $strategy;
    }

    /**
     * @return mixed
     */
    public function getPaymentLink($methodCode)
    {
        return $this->strategy->getPaymentLink();
    }
}