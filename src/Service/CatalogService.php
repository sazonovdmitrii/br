<?php
namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Catalog;
use Doctrine\ORM\EntityManager;

class CatalogService extends AbstractController
{
    protected $catalog;

    protected $entityManager;

    public function __construct(
       EntityManager $entityManager
    ) {
        $this->entityManager = $entityManager;
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
            $catalogUrl = $this->entityManager
                ->getRepository('App:CatalogUrl')
                ->find($urlsId);
            $catalog->addCatalogUrl($catalogUrl);
        }
        $this->entityManager->persist($catalog);
        $this->entityManager->flush();
    }
}