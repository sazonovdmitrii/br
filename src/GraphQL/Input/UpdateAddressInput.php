<?php

namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class UpdateAddressInput
 *
 * @package App\GraphQL\Input
 */
class UpdateAddressInput extends CreateAddressInput
{
    /**
     * @var
     */
    public $id;
}