<?php
namespace App\GraphQL\Resolver;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class WholesaleResolver
 *
 * @package App\GraphQL\Resolver
 */
class WholesaleResolver extends LocaleAlias
{
    /**
     * @var ProductRepository
     */
    private $productRepository;

    public function __construct(
        ProductRepository $productRepository,
        ContainerInterface $container
    ) {
        parent::__construct($container);
        $this->productRepository = $productRepository;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        return [
            'products' => $this->productRepository->findAll(),
            'count' => 123
        ];
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Wholesale'
        ];
    }
}