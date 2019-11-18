<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

class OrderInput extends RequestObject
{
    public $pickup_id;

    public $courier_id;

    public $address_id;

    public $payment_method_id;

    public $comment;

    public $lenses;
}