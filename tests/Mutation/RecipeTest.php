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
                    'recipe' => [
                        'recipes' => [
                            'sides' => [
                                'left' => [

                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ], $recipe);

        $recipe = $recipe['data']['addRecipe']['recipe']['recipes']['sides']['left'];
        $this->assertNotEmpty($recipe);

        $this->assertArraySubset([
            'id',
            'name',
            'value'
        ], array_keys($recipe[0]));
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
                    'recipe' => "{'recipes':{'left':{'7':'4.25','8':'23','9':'90','10':'35.5'},'right':{'7':'-3.25','8':'13','9':'10','10':'25.5'},'extraData':{'11':'52'}}}"
                ]
            ], $this->getToken()
        );

        $this->assertArraySubset([
            'data' => [
                'updateRecipe' => [
                    'recipe' => [
                        'recipes' => [
                            'sides' => [
                                'left' => [

                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ], $updatedRecipe);

        $updatedRecipe = $recipe['data']['addRecipe']['recipe']['recipes']['extraData'];
        $this->assertNotEmpty($recipe);
        $this->assertEquals($updatedRecipe[0]['value'], '52');
    }
}
