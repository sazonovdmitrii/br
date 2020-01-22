<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class UpdateBasketInput
 *
 * @package App\GraphQL\Input
 */
class UpdateBasketInput extends RequestObject
{
    /**
     * @var
     */
    public $item_id;

    /**
     * @var
     */
    public $qty;
}