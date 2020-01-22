<?php
namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class UserInput
 *
 * @package App\GraphQL\Input
 */
class UpdateRecipeInput extends RequestObject
{
    /**
     * @var
     */
    public $id;

    /**
     * @var
     */
    public $recipe;
}