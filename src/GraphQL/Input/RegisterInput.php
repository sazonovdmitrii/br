<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class RegisterInput
 *
 * @package App\GraphQL\Input
 */
class RegisterInput extends RequestObject
{
    /**
     * @var
     */
    public $email;

    /**
     * @var
     */
    public $password;

    /**
     * @var
     */
    public $confirm_password;
}