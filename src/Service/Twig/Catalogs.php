<?php
namespace App\Service\Twig;
use App\Entity\Catalog;
use App\Repository\CatalogRepository;
use Doctrine\ORM\EntityManager;

class Catalogs
{
    private $em;
    /**
     * @var CatalogRepository
     */
    private $catalogRepository;

    public function __construct(
        EntityManager $entityManager,
        CatalogRepository $catalogRepository
    ) {
        $this->em = $entityManager;
        $this->catalogRepository = $catalogRepository;
    }

    public function all()
    {
        return $this->catalogRepository->findAll();
    }
}