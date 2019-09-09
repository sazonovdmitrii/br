<?php

namespace App\Controller\Admin;

use App\Controller\AdminController;
use Doctrine\ORM\EntityManager;
use App\Entity\ProductItemTagItem;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductItemTagController extends AdminController
{
    private $entityManager;

    public function __construct(
        EntityManager $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    protected function removeAction()
    {
        $requestData = $this->request->request;
        if($requestData->has('tag_id')) {
            $tagItem = $this->_getProductItemTagItem($requestData->get('tag_id'));
            $this->entityManager->remove($tagItem);
            $this->entityManager->flush();
        }
        return new JsonResponse(['response' => 200]);
    }

    private function _getProductItemTagItem($tagId)
    {
        return $this->repository(ProductItemTagItem::class)
            ->find($tagId);
    }
}
