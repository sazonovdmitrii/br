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
    public $pickup_code;

    /**
     * @var
     */
    public $courier_id;

    /**
     * @var
     */
    public $address_id;

    /**
     * @var
     */
    public $payment_method_code;

    /**
     * @var
     */
    public $comment;

    /**
     * @var
     */
    public $lenses;
}