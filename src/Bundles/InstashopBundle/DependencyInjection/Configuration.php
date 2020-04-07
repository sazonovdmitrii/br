<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 06.04.2020.
 */

namespace App\Bundles\InstashopBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * Class Configuration
 * @package App\Bundles\InstashopBundle\DependencyInjection
 */
class Configuration implements ConfigurationInterface
{

    /**
     * @return TreeBuilder
     */
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('instashop');

        $rootNode
            ->children()
                ->arrayNode('instagram')
                    ->children()
                        ->scalarNode('client_id')->end()
                        ->scalarNode('token')->end()
                    ->end()
                ->end() // instagram
            ->end();

        $rootNode->children()->arrayNode('easy_admin')->end()->end();

        return $treeBuilder;
    }
}