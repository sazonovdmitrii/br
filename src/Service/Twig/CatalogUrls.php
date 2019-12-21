<?php
namespace App\Service\Twig;
use App\Entity\CatalogUrl;
use App\Repository\CatalogUrlRepository;
use Doctrine\ORM\EntityManager;

class CatalogUrls
{
    private $em;
    /**
     * @var CatalogUrlRepository
     */
    private $catalogUrlRepository;

    public function __construct(
        EntityManager $entityManager,
        CatalogUrlRepository $catalogUrlRepository
    ) {
        $this->em = $entityManager;
        $this->catalogUrlRepository = $catalogUrlRepository;
    }

    public function all()
    {
        return $this->catalogUrlRepository->findAll();
    }
}