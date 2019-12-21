<?php
namespace App\GraphQL\Resolver;

use App\Repository\DistrictRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class DistrictsResolver implements ResolverInterface, AliasedInterface
{
    private $em;
    /**
     * @var DistrictRepository
     */
    private $districtRepository;

    public function __construct(
        EntityManager $entityManager,
        DistrictRepository $districtRepository
    ) {
        $this->em = $entityManager;
        $this->districtRepository = $districtRepository;
    }

    public function resolve()
    {
        $districts = $this->districtRepository->findAll();
        return [
            'data' => $districts
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Districts'
        ];
    }
}