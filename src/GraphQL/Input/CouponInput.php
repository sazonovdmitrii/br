<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class CouponInputInput
 *
 * @package App\GraphQL\Input
 */
class CouponInput extends RequestObject
{
    /**
     * @var
     */
    public $coupon;
}