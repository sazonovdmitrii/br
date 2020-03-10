<?php

namespace App\Lp\PaymentBundle\Service;

interface PaymentInterface
{
    const TAG = 'payment.service';

    /**
     * @return mixed
     */
    public function getPaymentLink();
}