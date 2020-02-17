<?php
namespace App\Tests\Mutation;

use App\Tests\GraphQLTesting;

/**
 * Class RecipeTest
 *
 * @package App\Tests\Mutation
 */
class RecipeTest extends GraphQLTesting
{
    /**
     * @throws \ErrorException
     */
    public function testAddRecipe()
    {
        $recipe = $this->graphqlQuery(
            $this->getMutationTestQuery('addRecipe'), $this->getMutationTestData('addRecipe'), $this->getToken()
        );

        $this->assertArraySubset([
            'data' => [
                'addRecipe' => [

                ]
            ]
        ], $recipe);

        $recipe = $recipe['data']['addRecipe'];
        $this->assertNotEmpty($recipe);

        $this->assertArraySubset([
            'id',
            'recipe'
        ], array_keys($recipe));
    }

    public function testDeleteRecipe()
    {
        $recipe = $this->graphqlQuery(
            $this->getMutationTestQuery('addRecipe'), $this->getMutationTestData('addRecipe'), $this->getToken()
        );
        $recipeId = $recipe['data']['addRecipe']['id'];

        $deletedRecipe = $this->graphqlQuery(
            $this->getMutationTestQuery('deleteRecipe'), [
                'input' => [
                    'id' => $recipeId
                ]
            ], $this->getToken()
        );

        $this->assertArraySubset([
            'data' => [
                'deleteRecipe' => [

                ]
            ]
        ], $deletedRecipe);
        $deletedRecipeId = $deletedRecipe['data']['deleteRecipe']['id'];

        $this->assertEquals($recipeId, $deletedRecipeId);
    }

    public function testUpdateRecipe()
    {
        $recipe = $this->graphqlQuery(
            $this->getMutationTestQuery('addRecipe'), $this->getMutationTestData('addRecipe'), $this->getToken()
        );
        $recipeId = $recipe['data']['addRecipe']['id'];

        $updatedRecipe = $this->graphqlQuery(
            $this->getMutationTestQuery('updateRecipe'), [
                'input' => [
                    'id' => $recipeId,
                    'recipe' => '123123'
                ]
            ], $this->getToken()
        );

        $this->assertArraySubset([
            'data' => [
                'updateRecipe' => [

                ]
            ]
        ], $updatedRecipe);

        $updatedRecipe = $updatedRecipe['data']['updateRecipe']['recipe'];
        $this->assertEquals($updatedRecipe, '123123');
    }
}
