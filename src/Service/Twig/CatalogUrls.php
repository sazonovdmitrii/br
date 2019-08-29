<?php
namespace App\Service\Twig;
use App\Entity\CatalogUrl;
use Doctrine\ORM\EntityManager;

class CatalogUrls
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function all()
    {
        return $this->em->getRepository(CatalogUrl::class)->findAll();
    }
}