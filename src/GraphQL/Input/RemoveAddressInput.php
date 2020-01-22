<?php

namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class RemoveAddressInput
 *
 * @package App\GraphQL\Input
 */
class RemoveAddressInput extends RequestObject
{
    /**
     * @var
     */
    public $id;
}