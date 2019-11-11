<?php

namespace App\Controller\Admin;

use App\Controller\AdminController;
use App\Entity\LenseTag;
use App\Entity\LenseItemTag;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\JsonResponse;

class LenseTagController extends AdminController
{
    private $entityManager;

    public function __construct(
        EntityManager $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    protected function addAction()
    {
        $requestData = $this->request->request;
        if($requestData->has('option') && $requestData->has('tag_id')) {


            $productTag = $this->_getLenseTag($requestData->get('tag_id'));

            $tagItem = new LenseItemTag();
            $tagItem->translate('en')->setName($requestData->get('option'));

            $tagItem->setEntity($productTag);
            $tagItem->mergeNewTranslations();
            $this->entityManager->persist($tagItem);
            $this->entityManager->flush();

        }
        return new JsonResponse(['response' => 200]);
    }

    protected function removeAction()
    {
        $requestData = $this->request->request;
        if($requestData->has('tag_id')) {
            $tagItem = $this->_getLenseItemTag($requestData->get('tag_id'));
            $this->entityManager->remove($tagItem);
            $this->entityManager->flush();
        }
        return new JsonResponse(['response' => 200]);
    }

    private function _getLenseTag($tagId)
    {
        return $this->repository(LenseTag::class)
            ->find($tagId);
    }

    private function _getLenseItemTag($tagItemId)
    {
        return $this->repository(LenseItemTag::class)
            ->find($tagItemId);
    }
}
