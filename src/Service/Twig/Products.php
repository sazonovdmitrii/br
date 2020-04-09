<?php

namespace App\Service\Twig;

use App\Repository\ProductRepository;

/**
 * Class Products
 * @package App\Service\Twig
 */
class Products
{
    /**
     * @var ProductRepository
     */
    private $repository;

    /**
     * Products constructor.
     * @param ProductRepository $repository
     */
    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return array
     */
    public function all(): array
    {
        return $this->repository->findAll();
    }
}