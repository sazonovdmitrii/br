<?php
namespace App\Service\Twig;
use App\Entity\Lense;
use App\Entity\LenseItemTag;
use App\Entity\LenseTag;
use App\Repository\LenseRepository;
use Doctrine\ORM\EntityManager;

class Lenses
{
    private $em;

    /**
     * @var LenseRepository
     */
    private $lenseRepository;

    public function __construct(
        EntityManager $entityManager,
        LenseRepository $lenseRepository
    ) {
        $this->em = $entityManager;
        $this->lenseRepository = $lenseRepository;
    }

    public function getAll()
    {
        return $this->lenseRepository->findAll();
    }

    public function filter($tag, $tagId)
    {
        return $tag->getLenseitemstags()->filter(function (LenseItemTag $lenseTag) use ($tagId) {
            return $lenseTag->getEntity()->getId() == $tagId;
        }
        )->first();
    }
}