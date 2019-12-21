<?php
namespace App\GraphQL\Resolver;

use App\Repository\SaleRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use GraphQL\Error\UserError;

class SalesResolver implements ResolverInterface, AliasedInterface
{
    private $em;
    /**
     * @var SaleRepository
     */
    private $saleRepository;

    public function __construct(
        EntityManager $entityManager,
        SaleRepository $saleRepository
    ) {
        $this->em = $entityManager;
        $this->saleRepository = $saleRepository;
    }

    public function resolve(Argument $args)
    {
        $limit = (isset($args['limit'])) ? $args['limit'] : null;
        $banners = $this->saleRepository->findBy([], [], $limit);
        return [
            'data' => $banners
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Sales'
        ];
    }
}