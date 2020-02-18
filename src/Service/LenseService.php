<?php

namespace App\Service;

use App\Repository\LenseRepository;
use App\Repository\LenseTagRepository;
use App\Service\Structure\BasketRecipe;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LenseService extends AbstractController
{
    protected $entityManager;

    protected $cache;

    /**
     * @var LenseTagRepository
     */
    private $lenseTagRepository;
    /**
     * @var LenseRepository
     */
    private $lenseRepository;
    /**
     * @var StructureValidatorService
     */
    private $structureValidatorService;

    public function __construct(
        EntityManager $entityManager,
        \Symfony\Component\Cache\Adapter\AdapterInterface $cache,
        LenseTagRepository $lenseTagRepository,
        LenseRepository $lenseRepository,
        StructureValidatorService $structureValidatorService
    ) {
        $this->entityManager             = $entityManager;
        $this->cache                     = $cache;
        $this->lenseTagRepository        = $lenseTagRepository;
        $this->lenseRepository           = $lenseRepository;
        $this->structureValidatorService = $structureValidatorService;
    }

    /**
     * @param string $lense
     * @return array
     * $lense = "{'recipes':{'left':{'7':'4.25','8':'23','9':'90','10':'35.5'},'right':{'7':'-3.25','8':'13','9':'10','10':'25.5'},'extraData':{'11':'53'}},'lense':2}";
     */
    public function parse($lense = '')
    {
        if (!$lense) {
            return [];
        }

        $cacheItem = $this->cache->getItem('lense_' . md5($lense));
        if($cacheItem->isHit()) {
            return $cacheItem->get();
        }

        $lense = json_decode(str_replace('\'', '"', $lense), true);

        if (!$this->structureValidatorService->validateBasketRecipe($lense)) {
            return [];
        }

        $formattedRecipe = BasketRecipe::FORMATTED_RECIPE;

        if ($lenseEntity = $this->getLenseById($lense['lense'])) {
            $lenseResult = [
                'name'    => $lenseEntity->getName(),
                'price'   => $lenseEntity->getPrice(),
                'options' => [

                ]
            ];

            foreach ($lenseEntity->getLenseitemstags() as $lenseItemTag) {
                $lenseResult['options'][] = [
                    'name'  => $lenseItemTag->getEntity()->getName(),
                    'value' => $lenseItemTag->getName()
                ];
            }
            $formattedRecipe = array_merge_recursive($formattedRecipe, $lenseResult);
        }

        $recipes = $formattedRecipe['recipes'];
        foreach (array_keys($formattedRecipe['recipes']['sides']) as $side) {
            foreach ($lense['recipes'][$side] as $recipeId => $recipeValue) {
                $recipes['sides'][$side][] = $this->_toOption($recipeId, $recipeValue);
            }
        }

        foreach ($lense['recipes']['extraData'] as $recipeId => $recipeValue) {
            $recipes['extraData'][] = $this->_toOption($recipeId, $recipeValue);
        }

        $formattedRecipe['recipes'] = $recipes;

        $cacheItem->set($formattedRecipe);
        $this->cache->save($cacheItem);

        return $formattedRecipe;
    }

    /**
     * @param $lenseTagId
     * @return mixed
     */
    private function getLenseTagById($lenseTagId)
    {
        return $this->lenseTagRepository->find($lenseTagId);
    }

    /**
     * @param $lenseId
     * @return mixed
     */
    private function getLenseById($lenseId)
    {
        return $this->lenseRepository->find($lenseId);
    }

    private function _toOption($recipeId, $recipeValue)
    {
        if ($recipe = $this->getLenseTagById($recipeId)) {
            return [
                'name'  => $recipe->getName(),
                'value' => $recipeValue
            ];
        }
    }
}