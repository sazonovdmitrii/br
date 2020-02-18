<?php
namespace App\Service\Twig;
use App\Entity\Lense;
use App\Entity\LenseItemTag;
use App\Entity\LenseTag;
use App\Repository\LenseRepository;
use App\Service\ConfigService;
use App\Service\TagService;
use Doctrine\ORM\EntityManager;

class Lenses
{
    private $em;

    /**
     * @var LenseRepository
     */
    private $lenseRepository;
    /**
     * @var TagService
     */
    private $tagService;
    /**
     * @var ConfigService
     */
    private $configService;

    public function __construct(
        EntityManager $entityManager,
        LenseRepository $lenseRepository,
        TagService $tagService,
        ConfigService $configService
    ) {
        $this->em = $entityManager;
        $this->lenseRepository = $lenseRepository;
        $this->tagService = $tagService;
        $this->configService = $configService;
    }

    public function getAll()
    {
        return $this->lenseRepository->findAll();
    }

    public function filter($tag, $tagId)
    {
        $option = $tag->getLenseitemstags()->filter(function (LenseItemTag $lenseTag) use ($tagId) {
            return $lenseTag->getEntity()->getId() == $tagId;
        }
        )->first();
        return ($option) ? $option : [
            'name' => ''
        ];
    }

    /**
     * @param Lense $lense
     * @return bool
     */
    public function isNonReceipt(Lense $lense)
    {
        $lenseType = $this->tagService
            ->setEntity($lense)
            ->setTagId($this->configService->get('lense_type_tag'))
            ->getOneForLense();
        return $lenseType->getId() == $this->configService->get('lense_item_type_tag');
    }
}