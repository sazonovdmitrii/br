<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class InstashopPurchasesInput
 *
 * @package App\GraphQL\Input
 */
class InstashopPurchasesInput extends RequestObject
{
    /**
     * @var
     */
    public $ids;
}