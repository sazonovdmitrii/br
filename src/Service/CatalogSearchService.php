<?php
namespace App\Service;

use App\Repository\ProductItemRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;

class CatalogSearchService extends AbstractController
{
    protected $entityManager;
    /**
     * @var ProductItemRepository
     */
    private $productItemRepository;
    /**
     * @var ProductRepository
     */
    private $productRepository;

    public function __construct(
        EntityManager $entityManager,
        ProductItemRepository $productItemRepository,
        ProductRepository $productRepository
    ) {
        $this->entityManager = $entityManager;
        $this->productItemRepository = $productItemRepository;
        $this->productRepository = $productRepository;
    }

    public function search($slug)
    {
        $productsIds = $this->productItemRepository->search($slug);

        return $this->productRepository->findBy(['id' => $productsIds]);

    }
}