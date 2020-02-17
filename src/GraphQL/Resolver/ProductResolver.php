<?php
namespace App\GraphQL\Resolver;

use App\Repository\ProductUrlRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class ProductResolver extends LocaleAlias {

    private $em;
    /**
     * @var ProductUrlRepository
     */
    private $productUrlRepository;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     * @param ProductUrlRepository $productUrlRepository
     */
    public function __construct(
        EntityManager $em,
        ProductUrlRepository $productUrlRepository
    ) {
        $this->em = $em;
        $this->productUrlRepository = $productUrlRepository;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $productUrl = $this->productUrlRepository->findByUrl($args['slug']);

        if(!$productUrl) {
            $productUrl = $this->productUrlRepository->findByUrl($args['slug'] . '/');
        }
        if($productUrl) {
            $product = $productUrl->getEntity();
            $product->setCurrentLocale($args['locale']);
            return $product;
        }

        return [];
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Product'
        ];
    }
}