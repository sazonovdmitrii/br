<?php
namespace App\Service\Twig;
use App\Entity\LenseItemTag;
use App\Entity\LenseTag;
use Doctrine\ORM\EntityManager;

class LenseTags
{
    const RECEIPT = 'receipt';
    const SIMPLE = 'simple';

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

    public function getTags($tagsIds)
    {
        $result = [];
        if($tagsIds && count($tagsIds)) {
            foreach($tagsIds as $step => $tagsItemsIds) {
                $result[$step] = [];
                foreach($tagsItemsIds as $tagsItemsId) {
                    $lenseTagItem = $this->em->getRepository(LenseItemTag::class)->find($tagsItemsId);
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
        return $this->em->getRepository(LenseTag::class)
            ->findByType($type);
    }
}