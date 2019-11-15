<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class CitiesResolver extends LocaleAlias
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function resolve()
    {
        $cities = $this->em->getRepository('App:City')
            ->findAll();

        foreach($cities as $city) {
            $city->setCurrentLocale($this->getLocale());
        }
        
        return [
            'data' => $city
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Cities'
        ];
    }
}