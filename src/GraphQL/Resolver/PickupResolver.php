<?php
namespace App\GraphQL\Resolver;

use App\Repository\PickupRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class PickupResolver implements ResolverInterface, AliasedInterface
{
    private $em;
    /**
     * @var PickupRepository
     */
    private $pickupRepository;

    public function __construct(
        EntityManager $entityManager,
        PickupRepository $pickupRepository
    ) {
        $this->em = $entityManager;
        $this->pickupRepository = $pickupRepository;
    }

    public function resolve(Argument $args)
    {
        if(isset($args['city_id'])) {
            $pickups = $this->pickupRepository->findByCityId($args['city_id']);
        } else {
            $pickups = $this->pickupRepository->findAll();
        }
        return [
            'data' => $pickups
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Pickups'
        ];
    }
}