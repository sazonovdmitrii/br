<?php
namespace App\GraphQL\Resolver;

use App\Repository\RegionRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class RegionsResolver extends LocaleAlias
{
    private $em;
    /**
     * @var RegionRepository
     */
    private $regionRepository;

    public function __construct(
        EntityManager $entityManager,
        RegionRepository $regionRepository
    ) {
        $this->em = $entityManager;
        $this->regionRepository = $regionRepository;
    }

    public function resolve()
    {
        $regions = $this->regionRepository->findAll();

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