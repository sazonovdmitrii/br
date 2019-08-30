<?php
namespace App\Service\Twig;
use App\Entity\Catalog;
use Doctrine\ORM\EntityManager;

class Catalogs
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function all()
    {
        return $this->em->getRepository(Catalog::class)->findAll();
    }
}