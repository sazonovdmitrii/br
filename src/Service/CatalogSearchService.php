<?php
namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Catalog;
use Doctrine\ORM\EntityManager;

class CatalogSearchService extends AbstractController
{
    protected $entityManager;

    public function __construct(
       EntityManager $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    public function search($slug)
    {
        $productsIds = $this->entityManager
            ->getRepository('App:ProductItem')
            ->search($slug);

        return $this->entityManager
            ->getRepository('App:Product')
            ->findBy(['id' => $productsIds]);

    }
}