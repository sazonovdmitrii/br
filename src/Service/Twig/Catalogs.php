<?php
namespace App\Service\Twig;
use App\Entity\Catalog;
use App\Repository\CatalogRepository;
use Doctrine\ORM\EntityManager;

class Catalogs
{
    /**
     * @var CatalogRepository
     */
    private $catalogRepository;

    public function __construct(
        CatalogRepository $catalogRepository
    ) {
        $this->catalogRepository = $catalogRepository;
    }

    public function all()
    {
        return $this->catalogRepository->findAll();
    }
}