<?php
namespace App\Service\Twig;
use App\Entity\LenseItemTag;
use App\Entity\LenseTag;
use App\Entity\ProductItemTag;
use App\Entity\ProductTag;
use Doctrine\ORM\EntityManager;

class Tags
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function getTree()
    {
        return $this->em->getRepository(ProductTag::class)->findAll();
    }

    public function getItemTree()
    {
        return $this->em->getRepository(ProductItemTag::class)->findAll();
    }

    public function getLenseTagsItemsTree()
    {
        return $this->em->getRepository(LenseTag::class)->findAll();
    }
}