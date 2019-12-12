<?php
namespace App\Service\Twig;
use App\Entity\Lense;
use App\Entity\LenseItemTag;
use App\Entity\LenseTag;
use Doctrine\ORM\EntityManager;

class Lenses
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function getAll()
    {
        return $this->em->getRepository(Lense::class)->findAll();
    }

    public function filter($tag, $tagId)
    {
        return $tag->getLenseitemstags()->filter(function (LenseItemTag $lenseTag) use ($tagId) {
            return $lenseTag->getEntity()->getId() == $tagId;
        }
        )->first();
    }
}