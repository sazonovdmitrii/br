<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class OrderInput
 *
 * @package App\GraphQL\Input
 */
class OrderInput extends RequestObject
{
    /**
     * @var
     */
    public $external_payment_code;

    /**
     * @var
     */
    public $external_delivery_code;

    /**
     * @var
     */
    public $address_id;

    /**
     * @var
     */
    public $comment;

    /**
     * @var
     */
    public $lenses;
}