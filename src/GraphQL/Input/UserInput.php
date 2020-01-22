<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class UserInput
 *
 * @package App\GraphQL\Input
 */
class UserInput extends RequestObject
{
    /**
     * @var
     */
    public $email;

    /**
     * @var
     */
    public $password;
}