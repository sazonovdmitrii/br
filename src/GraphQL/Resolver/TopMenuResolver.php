<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use GraphQL\Error\UserError;

class TopMenuResolver implements ResolverInterface, AliasedInterface
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function resolve(Argument $args)
    {
        if(!isset($args['locale'])) {
            return [];
        }

        $topMenu = $this->em->getRepository('App:Menu')
            ->findOneBy(['name' => 'top_menu_' . $args['locale']]);

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
            'resolve' => 'TopMenu'
        ];
    }
}