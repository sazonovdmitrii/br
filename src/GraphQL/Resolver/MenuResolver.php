<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use GraphQL\Error\UserError;
use Symfony\Component\DependencyInjection\ContainerInterface;

class MenuResolver extends LocaleAlias
{
    private $em;

    public function __construct(
        EntityManager $entityManager,
        ContainerInterface $container
    ) {
        $this->em = $entityManager;
        parent::__construct($container);
    }

    public function resolve(Argument $args)
    {
        $topMenu = $this->em->getRepository('App:Menu')
            ->findOneBy(
                ['name' => $args['name'] . '_' . $this->getLocale()]
            );

        $result = [];
        if($topMenu && $topMenu->getMenu()) {
            $menu = json_decode($topMenu->getMenu(), true);
            $result = $menu[0]['children'];
        }
        return [
            'data' => $result
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Menu'
        ];
    }
}