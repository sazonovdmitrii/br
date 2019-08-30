<?php
namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Product;
use Doctrine\ORM\EntityManager;
use App\Entity\Catalog;

class ProductService extends AbstractController
{
    protected $product;
    protected $tagOptionService;
    protected $entityManager;

    public function __construct(
        TagOptionService $tagOptionService,
        EntityManager $entityManager
    ) {
        $this->tagOptionService = $tagOptionService;
        $this->entityManager = $entityManager;
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

        $this->getDoctrine()
            ->getRepository(Catalog::class)
            ->flushByProduct($product);

        foreach($catalogsIds as $catalogsId) {

            $catalog = $this->entityManager
                ->getRepository('App:Catalog')
                ->find($catalogsId);

            $product->addCatalog($catalog);
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();
    }
}