<?php
namespace App\GraphQL\Resolver;

use App\Repository\CourierRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class CouriersResolver implements ResolverInterface, AliasedInterface
{
    private $em;
    /**
     * @var CourierRepository
     */
    private $courierRepository;

    public function __construct(
        EntityManager $entityManager,
        CourierRepository $courierRepository
    ) {
        $this->em = $entityManager;
        $this->courierRepository = $courierRepository;
    }

    public function resolve(Argument $args)
    {
        if(isset($args['city_id'])) {
            $pickups = $this->courierRepository->findByCityId($args['city_id']);
        } else {
            $pickups = $this->courierRepository->findAll();
        }
        return [
            'data' => $pickups
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Couriers'
        ];
    }
}