<?php
namespace App\GraphQL\Resolver;
use Doctrine\ORM\EntityManager;
use App\Entity\Product;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Relay\Connection\Output\Connection;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use App\Service\TagService;

class SimilarProductResolver implements ResolverInterface, AliasedInterface {

    private $em;

    private $tagService;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        TagService $tagService
    ) {
        $this->em = $em;
        $this->tagService = $tagService;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Product $product, Argument $args)
    {
        $similars = $this->tagService
            ->setEntity($product)
            ->setEntityType(Product::class)
            ->similars();

        $paginator = new Paginator(function () use ($similars, $args) {
            return array_slice($similars, $args['offset'], $args['limit'] ?? 10);
        });
        return $paginator->auto($args, count($similars));
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'SimilarProduct'
        ];
    }
}