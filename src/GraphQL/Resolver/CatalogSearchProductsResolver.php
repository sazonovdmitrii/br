<?php
namespace App\GraphQL\Resolver;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use App\Service\CatalogSearchService;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;

class CatalogSearchProductsResolver extends LocaleAlias {

    private $em;

    private $catalogSearch;
    /**
     * CatalogSearchResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        CatalogSearchService $catalogSearchService
    ) {
        $this->em = $em;
        $this->catalogSearch = $catalogSearchService;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(array $products, Argument $args)
    {
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
            'resolve' => 'CatalogSearchProducts'
        ];
    }
}