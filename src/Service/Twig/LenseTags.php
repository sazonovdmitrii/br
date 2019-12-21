<?php
namespace App\Service\Twig;
use App\Entity\LenseItemTag;
use App\Entity\LenseTag;
use App\Repository\LenseItemTagRepository;
use App\Repository\LenseTagRepository;
use Doctrine\ORM\EntityManager;
use App\Service\LenseService;

class LenseTags
{
    const RECEIPT = 'receipt';
    const SIMPLE = 'simple';

    private $em;

    private $lenseService;
    /**
     * @var LenseTagRepository
     */
    private $lenseTagRepository;
    /**
     * @var LenseItemTagRepository
     */
    private $lenseItemTagRepository;

    public function __construct(
        EntityManager $entityManager,
        LenseService $lenseService,
        LenseTagRepository $lenseTagRepository,
        LenseItemTagRepository $lenseItemTagRepository
    ) {
        $this->em = $entityManager;
        $this->lenseService = $lenseService;
        $this->lenseTagRepository = $lenseTagRepository;
        $this->lenseItemTagRepository = $lenseItemTagRepository;
    }

    public function getTree()
    {
        return $this->lenseTagRepository->findAll();
    }

    public function getItemTree()
    {
        return $this->lenseItemTagRepository->findAll();
    }

    public function getTags($tagsIds)
    {
        $result = [];
        if($tagsIds && count($tagsIds)) {
            foreach($tagsIds as $step => $tagsItemsIds) {
                $result[$step] = [];
                foreach($tagsItemsIds as $tagsItemsId) {
                    $lenseTagItem = $this->lenseItemTagRepository->find($tagsItemsId);
                    $result[$step][] = $lenseTagItem->getId();
                }
            }
        }
        return $result;
    }

    public function isReceipt($entity)
    {
        return $entity->getType() == self::RECEIPT;
    }

    public function isSimple($entity)
    {
        return $entity->getType() == self::SIMPLE;
    }

    public function getLenseTagsItemsTree($type)
    {
        return $this->lenseTagRepository->findByType($type);
    }

    public function parseLenses($lenses)
    {
        return $this->lenseService->parse($lenses);
    }
}