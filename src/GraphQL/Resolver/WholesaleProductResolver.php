<?php
namespace App\GraphQL\Resolver;
use App\Repository\CatalogUrlRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManager;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Relay\Connection\Output\Connection;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;

/**
 * Class WholesaleProductResolver
 *
 * @package App\GraphQL\Resolver
 */
class WholesaleProductResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * WholesaleProductResolver constructor.
     *
     * @param ProductRepository $productRepository
     */
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(array $proxy, Argument $args)
    {
        $products = $this->productRepository->findAll();

        $paginator = new Paginator(function () use ($products, $args) {
            return array_slice($products, $args['offset'], $args['limit'] ?? 10);
        });
        return $paginator->auto($args, count($products));
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'WholesaleProduct'
        ];
    }
}