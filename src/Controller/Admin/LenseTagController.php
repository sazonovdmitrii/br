<?php

namespace App\Controller\Admin;

use App\Controller\AdminController;
use App\Entity\LenseTag;
use App\Entity\LenseItemTag;
use App\Service\ConfigService;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\JsonResponse;

class LenseTagController extends AdminController
{
    private $entityManager;
    /**
     * @var ConfigService
     */
    private $configService;

    private $defaultLocale;

    public function __construct(
        EntityManager $entityManager,
        ConfigService $configService
    ) {
        $this->entityManager = $entityManager;
        $this->configService = $configService;
        $this->defaultLocale = $this->configService->getServiceConfig('a2lix_translation_form.default_locale');
    }

    protected function addAction()
    {
        $requestData = $this->request->request;
        if($requestData->has('option') && $requestData->has('tag_id')) {


            $productTag = $this->_getLenseTag($requestData->get('tag_id'));

            $tagItem = new LenseItemTag();

            $tagItem->translate($this->defaultLocale)
                ->setName($requestData->get('option'));

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
