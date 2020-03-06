<?php

namespace App\Lp\PaymentBundle\Service\Methods;

/**
 * Interface PaymentMethodInterface
 *
 * @package App\Lp\PaymentBundle\Service\Methods
 */
interface PaymentMethodInterface
{
    /**
     * @return mixed
     */
    public function getPaymentLink();
}