<?php
namespace App\Service\Twig;

use App\Repository\ProductCollectionRepository;

class Collections
{
    /**
     * @var ProductCollectionRepository
     */
    private $productCollectionRepository;

    public function __construct(ProductCollectionRepository $productCollectionRepository)
    {
        $this->productCollectionRepository = $productCollectionRepository;
    }

    public function getAll()
    {
        return $this->productCollectionRepository->findAll();
    }
}