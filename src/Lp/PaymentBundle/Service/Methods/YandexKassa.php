<?php
namespace App\Lp\PaymentBundle\Service\Methods;

class YandexKassa implements PaymentMethodInterface
{
    /**
     * @return mixed
     */
    public function getPaymentLink()
    {
        return 'https://money.yandex.ru/payments/external/fail?orderId=25f4505b-000f-5000-a000-1aaa6a5a00bd';
    }

    public function code()
    {
        return '00-2002';
    }
}