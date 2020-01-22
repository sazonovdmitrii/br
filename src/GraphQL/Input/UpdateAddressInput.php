<?php

namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

/**
 * Class UpdateAddressInput
 *
 * @package App\GraphQL\Input
 */
class UpdateAddressInput extends RequestObject
{
    /**
     * @var
     */
    public $id;

    /**
     * @var
     */
    public $item_id;

    /**
     * @var
     */
    public $name;

    /**
     * @var
     */
    public $person;

    /**
     * @var
     */
    public $zip;

    /**
     * @var
     */
    public $region_id;

    /**
     * @var
     */
    public $city;

    /**
     * @var
     */
    public $street;

    /**
     * @var
     */
    public $house;

    /**
     * @var
     */
    public $corp;

    /**
     * @var
     */
    public $level;

    /**
     * @var
     */
    public $flat;

    /**
     * @var
     */
    public $code;
}