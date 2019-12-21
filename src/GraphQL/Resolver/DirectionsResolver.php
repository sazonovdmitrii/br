<?php
namespace App\GraphQL\Resolver;

use App\Repository\DirectionRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class DirectionsResolver implements ResolverInterface, AliasedInterface
{
    private $em;
    /**
     * @var DirectionRepository
     */
    private $directionRepository;

    public function __construct(
        EntityManager $entityManager,
        DirectionRepository $directionRepository
    ) {
        $this->em = $entityManager;
        $this->directionRepository = $directionRepository;
    }

    public function resolve()
    {
        $regions = $this->directionRepository->findAll();
        return [
            'data' => $regions
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Directions'
        ];
    }
}