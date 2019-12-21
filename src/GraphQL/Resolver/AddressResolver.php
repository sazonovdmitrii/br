<?php
namespace App\GraphQL\Resolver;

use App\Repository\AddressRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class AddressResolver implements ResolverInterface, AliasedInterface
{
    public $em;
    /**
     * @var AddressRepository
     */
    private $addressRepository;

    /**
     * AddressResolver constructor.
     *
     * @param EntityManager $em
     * @param AddressRepository $addressRepository
     */
    public function __construct(
        EntityManager $em,
        AddressRepository $addressRepository
    ) {
        $this->em = $em;
        $this->addressRepository = $addressRepository;
    }

    /**
     * @return mixed
     */
    public function resolve(Argument $args)
    {
        return $this->addressRepository->find($args['id']);
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Address'
        ];
    }
}