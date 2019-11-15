<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use App\Service\JsonService;
use App\Service\Image\GeneratorService;

class ProductItemResolver extends LocaleAlias {

    private $em;

    private $imageGenerator;

    public function __construct(
        EntityManager $em,
        GeneratorService $generatorService
    ) {
        $this->em = $em;
        $this->imageGenerator = $generatorService;
    }

    public function resolve(Argument $args)
    {
        $config = $this->em->getRepository('App:ImageType')->findAll();

        $productItem = $this->em->getRepository('App:ProductItem')
            ->find($args['id']);

        $productItem->setCurrentLocale($this->getLocale());

        $images = [];

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