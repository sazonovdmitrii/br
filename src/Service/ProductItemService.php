<?php
namespace App\Service;

use App\Entity\ProductItemImage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use App\Entity\ProductItem;

class ProductItemService extends AbstractController
{
    protected $entityManager;

    protected $productItem;

    public function __construct(
        EntityManager $entityManager
    ) {
        $this->entityManager = $entityManager;
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

        $this->getDoctrine()
            ->getRepository(ProductItemImage::class)
            ->flushByProductItem($productItem);

        foreach($imagesIds as $imagesId) {

            $productItemImage = $this->entityManager
                ->getRepository('App:ProductItemImage')
                ->find($imagesId);

            $productItem->addProductItemImage($productItemImage);
        }

        $this->entityManager->persist($productItem);
        $this->entityManager->flush();
    }
}