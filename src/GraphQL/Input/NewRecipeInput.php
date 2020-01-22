<?php
namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class UserInput
 *
 * @package App\GraphQL\Input
 */
class NewRecipeInput extends RequestObject
{
    /**
     * @var
     */
    public $recipe;
}