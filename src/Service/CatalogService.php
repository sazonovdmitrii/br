<?php
namespace App\Service;

use App\Repository\CatalogUrlRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Catalog;
use Doctrine\ORM\EntityManager;

class CatalogService extends AbstractController
{
    protected $catalog;

    protected $entityManager;
    /**
     * @var CatalogUrlRepository
     */
    private $catalogUrlRepository;

    public function __construct(
        EntityManager $entityManager,
        CatalogUrlRepository $catalogUrlRepository
    ) {
        $this->entityManager = $entityManager;
        $this->catalogUrlRepository = $catalogUrlRepository;
    }

    public function setCatalog(Catalog $catalog)
    {
        $this->catalog = $catalog;
        return $this;
    }

    public function getCatalog()
    {
        return $this->catalog;
    }

    public function updateCatalogUrls(array $urlsIds)
    {
        $catalog = $this->getCatalog();
        foreach($urlsIds as $urlsId) {
            $catalogUrl = $this->catalogUrlRepository->find($urlsId);
            $catalog->addCatalogUrl($catalogUrl);
        }
        $this->entityManager->persist($catalog);
        $this->entityManager->flush();
    }
}