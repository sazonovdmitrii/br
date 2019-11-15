<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class RegionsResolver extends LocaleAlias
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function resolve()
    {
        $regions = $this->em->getRepository('App:Region')
            ->findAll();

        foreach($regions as $region) {
            $region->setCurrentLocale($this->getLocale());
        }

        return [
            'data' => $regions
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Regions'
        ];
    }
}