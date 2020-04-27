<?php
namespace App\GraphQL\Resolver;

use App\Repository\BannerRepository;
use App\Repository\ImageTypeRepository;
use App\Repository\ProductRepository;
use App\Service\Image\GeneratorService;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Bundles\InstashopBundle\Controller\ApiController;

/**
 * Class BannerResolver
 *
 * @package App\GraphQL\Resolver
 */
class InstashopResolver extends LocaleAlias implements ResolverInterface, AliasedInterface
{
    /**
     * @var \App\Bundles\InstashopBundle\Controller\ApiController
     */
    private $apiController;

    public function __construct(
        ContainerInterface $container,
        ProductRepository $productRepository,
        ApiController $apiController
    ) {
        parent::__construct($container);
        $this->apiController = $apiController;
    }

    /**
     * @return array
     */
    public function resolve($args)
    {
        $dataResolver = $this->apiController->setRepositoryLocale($args['locale']);
        if(isset($args['tag'])) {
            $data = $dataResolver->getImagesByTag($args['tag']);
        } elseif(isset($args['product_id'])) {
            $data = $dataResolver->getImagesByProduct($args['product_id']);
        } elseif(isset($args['item_id'])) {
            $data = $dataResolver->getImagesByProductItem($args['item_id']);
        } else {
            $data = $dataResolver->getAllImages();
        }
        return [
            'data' => $data
        ];
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Instashop'
        ];
    }
}