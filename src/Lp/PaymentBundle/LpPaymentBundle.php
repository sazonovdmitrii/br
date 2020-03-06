<?php

namespace App\Lp\PaymentBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use App\Lp\PaymentBundle\Service\PaymentInterface;

/**
 * Class LpPaymentBundle
 *
 * @package App\Lp\PaymentBundle
 */
class LpPaymentBundle extends Bundle
{
    /**
     * @param ContainerBuilder $container
     */
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->registerForAutoconfiguration(PaymentInterface::class)->addTag(PaymentInterface::TAG);
    }
}