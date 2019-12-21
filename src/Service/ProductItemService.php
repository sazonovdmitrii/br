<?php
namespace App\Service;

use App\Entity\ProductItemImage;
use App\Repository\ProductItemImageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use App\Entity\ProductItem;

class ProductItemService extends AbstractController
{
    protected $entityManager;

    protected $productItem;
    /**
     * @var ProductItemImageRepository
     */
    private $productItemImageRepository;

    public function __construct(
        EntityManager $entityManager,
        ProductItemImageRepository $productItemImageRepository
    ) {
        $this->entityManager = $entityManager;
        $this->productItemImageRepository = $productItemImageRepository;
    }

    public function setProductItem(ProductItem $productItem)
    {
        $this->productItem = $productItem;
        return $this;
    }

    public function getProductItem()
    {
        return $this->productItem;
    }

    public function updateImages(array $imagesIds)
    {
        $productItem = $this->getProductItem();

        foreach($imagesIds as $imagesId) {

            $productItemImage = $this->productItemImageRepository->find($imagesId);
            if($productItemImage) {
                $productItem->addProductItemImage($productItemImage);
            }
        }

        $this->entityManager->persist($productItem);
        $this->entityManager->flush();
    }
}