<?php

namespace App\Service;

use App\Service\Structure\BasketRecipe;

/**
 * Class StructureValidatorService
 *
 * @package App\Service
 */
class StructureValidatorService
{
    /**
     * @param $recipe
     * @return bool
     */
    public function validateBasketRecipe($recipe)
    {
        if (!$this->_validateTypedRecipe($recipe, BasketRecipe::RECIPE) && !$this->_validateTypedRecipe($recipe, BasketRecipe::LENSE_RECIPE)) {
            return false;
        }
        return true;
    }

    /**
     * @param $recipe
     * @param $recipeStructure
     * @return bool
     */
    public function _validateTypedRecipe($recipe, $recipeStructure)
    {
        foreach ($recipeStructure as $primaryKey => $primaryStructure) {
            if (!isset($recipe[$primaryKey])) {
                return false;
            }
            foreach ($primaryStructure as $slaveKey => $slaveStructure) {
                if (!isset($recipe[$primaryKey][$slaveKey])) {
                    return false;
                }
            }
        }

        return true;
    }
}