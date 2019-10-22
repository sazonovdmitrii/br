<?php

namespace Impulze\Bundle\InterventionImageBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class ImpulzeInterventionImageExtension extends Extension
{
    public function load(array $config, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $config);

        $container->setParameter('intervention_image', $config);

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/Config'));
        $loader->load('services.yaml');
    }
}
