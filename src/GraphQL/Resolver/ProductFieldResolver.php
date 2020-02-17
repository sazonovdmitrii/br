<?php

namespace App\GraphQL\Resolver;

use App\Repository\ImageTypeRepository;
use App\Repository\ProductUrlRepository;
use Doctrine\ORM\EntityManager;
use App\Entity\Product;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;
use Overblog\GraphQLBundle\Relay\Connection\Output\Connection;
use App\Service\TagService;
use App\Service\ConfigService;
use App\Entity\Catalog;
use App\Service\Image\GeneratorService;
use App\Entity\LenseItemTag;

class ProductFieldResolver extends LocaleAlias
{

    private $em;

    private $configService;
    /**
     * @var ProductUrlRepository
     */
    private $productUrlRepository;
    /**
     * @var ImageTypeRepository
     */
    private $imageTypeRepository;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        TagService $tagService,
        ConfigService $configService,
        GeneratorService $generatorService,
        ProductUrlRepository $productUrlRepository,
        ImageTypeRepository $imageTypeRepository
    ) {
        $this->em = $em;
        $this->tagService = $tagService;
        $this->configService = $configService;
        $this->imageGenerator = $generatorService;
        $this->productUrlRepository = $productUrlRepository;
        $this->imageTypeRepository = $imageTypeRepository;
    }

    /**
     * @param ResolveInfo $info
     * @param $value
     * @param Argument $args
     * @return mixed
     */
    public function __invoke(ResolveInfo $info, $value, Argument $args)
    {
        $method = $info->fieldName;
        return $this->$method($value, $args);
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $productUrl = $this->productUrlRepository->findByUrl($args['slug']);

        if ($productUrl) {
            return $productUrl->setCurrentLocale($args['locale'])->getEntity();
        }

        return [];
    }

    /**
     * @param Product $product
     * @return null|string
     */
    public function name(Product $product)
    {
        return $product->getName();
    }

    public function catalog(Product $product, $args)
    {
        foreach($product->getCatalog() as $catalog) {
            $catalog->setCurrentLocale($product->getCurrentLocale());
        }
        return $product->getCatalog();
    }

    /**
     * @param Product $product
     * @return mixed|string
     */
    public function url(Product $product)
    {
        if($productUrl = $this->productUrlRepository->findByEntity($product->getId())) {
            return str_replace('//', '/', '/' . $productUrl);
        }
        return '';
    }

    /**
     * @param Product $product
     * @return int|null
     */
    public function id(Product $product)
    {
        return $product->getId();
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function tags(Product $product)
    {
        return $this->tagService
            ->setEntityType(Product::class)
            ->setEntity($product)
            ->setLocale($product->getCurrentLocale())
            ->getFilters();
    }

    /**
     * @param Product $product
     * @param Argument $args
     * @return Connection
     */
    public function items(Product $product, Argument $args) :Connection
    {
        $items = $product->getProductItems()->toArray();

        $imageConfiguration = $this->imageTypeRepository->findAll();

        foreach($items as $item) {

            $item->setCurrentLocale($product->getCurrentLocale());

            $images = [];
            foreach($item->getProductItemImages() as $image) {
                $images[] = $this->imageGenerator
                    ->setImage($image)
                    ->setTypes(['original', 'webp'])
                    ->setConfig($imageConfiguration)
                    ->getAll();
            }
            $images = array_reverse($images);
            $item->setImages($images);
        }

        $paginator = new Paginator(function () use ($items, $args) {
            return array_slice($items, $args['offset'], $args['limit'] ?? 10);
        });

        return $paginator->auto($args, count($items));
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function other_fragrance(Product $product)
    {
        $aromat = $this->tagService
            ->setEntityType(Product::class)
            ->setEntity($product)
            ->setLocale($product->getCurrentLocale())
            ->setTagId($this->configService->get('fragrance_tag'))
            ->getOne();

        $catalog = $this->tagService
            ->setEntityType(Catalog::class)
            ->setTagId($aromat->getId())
            ->setLocale($product->getCurrentLocale())
            ->getOne();

        return $catalog->getProducts()->slice(0, 10);
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function other_brand(Product $product)
    {
        $brand = $this->tagService
            ->setEntityType(Product::class)
            ->setEntity($product)
            ->setLocale($product->getCurrentLocale())
            ->setTagId($this->configService->get('brand_tag'))
            ->getOne();

        $catalog = $this->tagService
            ->setEntityType(Catalog::class)
            ->setLocale($product->getCurrentLocale())
            ->setTagId($brand->getId())
            ->getOne();

        return $catalog->getProducts()->slice(0, 10);
    }

    /**
     * @param Product $product
     * @return \App\Entity\Lense[]|\Doctrine\Common\Collections\Collection
     */
    public function lenses(Product $product)
    {
        $lenses = $product->getLenses();

        foreach($lenses as &$lense) {
            foreach($lense->getLenseitemstags() as &$lenseitemstag) {
                $lenseitemstag->setCurrentLocale($product->getCurrentLocale());
                $lenseitemstag->getEntity()->setCurrentLocale($product->getCurrentLocale());
            }
        }

        return $lenses;
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