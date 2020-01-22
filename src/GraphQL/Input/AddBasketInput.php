<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class AddBasketInput
 *
 * @package App\GraphQL\Input
 */
class AddBasketInput extends RequestObject
{
    /**
     * @var
     */
    public $item_id;

    /**
     * @var
     */
    public $lenses;
}