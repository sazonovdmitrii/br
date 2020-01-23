<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class TokenInput
 *
 * @package App\GraphQL\Input
 */
class ChangePasswordInput extends RequestObject
{
    /**
     * @var
     */
    public $token;

    /**
     * @var
     */
    public $password;
}