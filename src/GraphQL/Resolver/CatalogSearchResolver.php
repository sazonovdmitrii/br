<?php
namespace App\GraphQL\Resolver;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use App\Service\CatalogSearchService;

class CatalogSearchResolver extends LocaleAlias {

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
    public function resolve(Argument $args)
    {
        if(isset($args['name']) && $args['name']) {
            return $this->catalogSearch->search($args['name']);
        }

        return [
            'products' => []
        ];
    }
    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'CatalogSearch'
        ];
    }
}