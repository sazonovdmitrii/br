<?php
namespace App\Service\Twig;
use App\Entity\LenseItemTag;
use App\Entity\LenseTag;
use Doctrine\ORM\EntityManager;

class LenseTags
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function getTree()
    {
        return $this->em->getRepository(LenseTag::class)->findAll();
    }

    public function getItemTree()
    {
        return $this->em->getRepository(LenseItemTag::class)->findAll();
    }
}