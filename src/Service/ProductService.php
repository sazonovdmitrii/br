<?php
namespace App\Service;

use App\Repository\CatalogRepository;
use App\Repository\ProductUrlRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Product;
use Doctrine\ORM\EntityManager;
use App\Entity\Catalog;

class ProductService extends AbstractController
{
    protected $product;
    protected $tagOptionService;
    protected $entityManager;
    /**
     * @var CatalogRepository
     */
    private $catalogRepository;
    /**
     * @var ProductUrlRepository
     */
    private $productUrlRepository;

    public function __construct(
        TagOptionService $tagOptionService,
        EntityManager $entityManager,
        CatalogRepository $catalogRepository,
        ProductUrlRepository $productUrlRepository
    ) {
        $this->tagOptionService = $tagOptionService;
        $this->entityManager = $entityManager;
        $this->catalogRepository = $catalogRepository;
        $this->productUrlRepository = $productUrlRepository;
    }

    public function setProduct(Product $product)
    {
        $this->product = $product;
        return $this;
    }

    public function getProduct()
    {
        return $this->product;
    }

    public function relatedBrandProducts()
    {
        $relateds = [];

        if(!($product = $this->getProduct())) {
            return $relateds;
        }
    }

    /**
     * @param $catalogsIds
     */
    public function updateCatalogs($catalogsIds)
    {
        $product = $this->getProduct();

        $this->catalogRepository->flushByProduct($product);

        foreach($catalogsIds as $catalogsId) {

            $catalog = $this->catalogRepository->find($catalogsId);

            $product->addCatalog($catalog);
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();
    }

    public function updateProductUrls(array $urlsIds)
    {
        $product = $this->getProduct();
        foreach($urlsIds as $urlsId) {
            $catalogUrl = $this->productUrlRepository->find($urlsId);
            $product->addProductUrl($catalogUrl);
        }
        $this->entityManager->persist($product);
        $this->entityManager->flush();
    }
}