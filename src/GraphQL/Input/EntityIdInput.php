<?php
namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class UserInput
 *
 * @package App\GraphQL\Input
 */
class EntityIdInput extends RequestObject
{
    /**
     * @var
     */
    public $id;
}