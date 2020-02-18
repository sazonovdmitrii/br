<?php
namespace App\Service;

use App\Service\Structure\BasketRecipe;

class StructureValidatorService
{
    public function validateBasketRecipe($recipe)
    {
        $recipeStructure = BasketRecipe::RECIPE;

        foreach($recipeStructure as $primaryKey => $primaryStructure) {
            if(!isset($recipe[$primaryKey])) {
                return false;
            }
            foreach($primaryStructure as $slaveKey => $slaveStructure) {
                if(!isset($recipe[$primaryKey][$slaveKey])) {
                    return false;
                }
            }
        }

        return true;
    }
}