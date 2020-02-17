<?php
namespace App\GraphQL\Resolver;

use App\Repository\MenuRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use GraphQL\Error\UserError;

class TopMenuResolver extends LocaleAlias
{
    private $em;
    /**
     * @var MenuRepository
     */
    private $menuRepository;

    public function __construct(
        EntityManager $entityManager,
        MenuRepository $menuRepository
    ) {
        $this->em = $entityManager;
        $this->menuRepository = $menuRepository;
    }

    public function resolve(Argument $args)
    {
        $topMenu = $this->menuRepository
            ->findOneBy(
                ['name' => 'top_menu_' . $args['locale']]
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
            'resolve' => 'TopMenu'
        ];
    }
}