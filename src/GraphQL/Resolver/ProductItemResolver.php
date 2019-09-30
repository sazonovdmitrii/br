<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class ProductItemResolver extends LocaleAlias {

    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function resolve(Argument $args)
    {
        $productItem = $this->em->getRepository('App:ProductItem')
            ->find($args['id']);
        $productItem->setCurrentLocale($this->getLocale());
        return $productItem;
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'ProductItem'
        ];
    }
}