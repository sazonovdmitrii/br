<?php
namespace App\GraphQL\Resolver;

use App\Repository\CityRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class CitiesResolver extends LocaleAlias
{
    private $em;
    /**
     * @var CityRepository
     */
    private $cityRepository;

    /**
     * CitiesResolver constructor.
     *
     * @param EntityManager $entityManager
     * @param CityRepository $cityRepository
     */
    public function __construct(
        EntityManager $entityManager,
        CityRepository $cityRepository
    ) {
        $this->em = $entityManager;
        $this->cityRepository = $cityRepository;
    }

    public function resolve()
    {
        $cities = $this->cityRepository->findAll();

        foreach($cities as $city) {
            $city->setCurrentLocale($this->getLocale());
        }

        return [
            'data' => $cities
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Cities'
        ];
    }
}