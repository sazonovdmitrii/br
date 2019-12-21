<?php
namespace App\GraphQL\Resolver;

use App\Repository\ImageTypeRepository;
use App\Repository\ProductItemRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use App\Service\JsonService;
use App\Service\Image\GeneratorService;

class ProductItemResolver extends LocaleAlias {

    private $em;

    private $imageGenerator;
    /**
     * @var ProductItemRepository
     */
    private $productItemRepository;
    /**
     * @var ImageTypeRepository
     */
    private $imageTypeRepository;

    public function __construct(
        EntityManager $em,
        GeneratorService $generatorService,
        ProductItemRepository $productItemRepository,
        ImageTypeRepository $imageTypeRepository
    ) {
        $this->em = $em;
        $this->imageGenerator = $generatorService;
        $this->productItemRepository = $productItemRepository;
        $this->imageTypeRepository = $imageTypeRepository;
    }

    public function resolve(Argument $args)
    {
        $productItem = $this->productItemRepository->find($args['id']);

        $productItem->setCurrentLocale($this->getLocale());

        $images = [];

        $config = $this->imageTypeRepository->findAll();

        foreach($productItem->getProductItemImages() as $image) {

            $images[] = $this->imageGenerator
                ->setImage($image)
                ->setTypes(['original', 'webp'])
                ->setConfig($config)
                ->getAll();

        }

        $productItem->setImages($images);

        return $productItem;
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'ProductItem'
        ];
    }
}