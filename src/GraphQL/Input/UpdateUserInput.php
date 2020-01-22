<?php

namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class UpdateUserInput
 *
 * @package App\GraphQL\Input
 */
class UpdateUserInput extends RequestObject
{
    /**
     * @var
     */
    public $id;

    /**
     * @var
     */
    public $firstname;

    /**
     * @var
     */
    public $lastname;

    /**
     * @var
     */
    public $phone;

    /**
     * @var
     */
    public $gender;
}