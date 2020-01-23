<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class TokenInput
 *
 * @package App\GraphQL\Input
 */
class TokenInput extends RequestObject
{
    /**
     * @var
     */
    public $token;
}