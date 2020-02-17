<?php
namespace App\Tests;

/**
 * Trait MutationTestData
 *
 * @package App\Tests
 */
trait MutationTestData
{
    public function authData($email = 'sazon@nxt.ru')
    {
        return [
            'email' => $email,
            'password' => 'everest1024'
        ];
    }

    public function addBasketData()
    {
        return [
            'item_id' => '115'
        ];
    }

    public function addRecipeData()
    {
        return [
            'recipe' => 'asdfasdf'
        ];
    }

    public function couponData()
    {
        return [
            'coupon' => 'HELPROSTURIZM'
        ];
    }

    public function changePasswordData()
    {
        return [
            'token' => 'hce0ddufQmVjFxXlJ1afi5dLCvxcvV',
            'password' => 'everest1024'
        ];
    }

    public function restoreData()
    {
        return [
            'login' => 'sazon@nxt.ru'
        ];
    }

    public function tempAuthData()
    {
        return [
            'email' => 'sazon@nxt.ru',
            'password' => '123'
        ];
    }

    public function createAddressData()
    {
        return [
            'name' => 'Rostov Dobrovolskogo',
            'person' => 'hey hello',
            'zip' => '353614',
            'region_id' => '34',
            'city' => 'Rostov',
            'street' => 'Dobrovolskogo',
            'house' => '40',
            'corp' => '9',
            'level' => '8',
            'flat' => '62',
            'code' => '1514'
        ];
    }

    public function createOrderData()
    {
        return [
            'courier_id' => '1500',
            'address_id' => '1',
            'payment_method_code' => '00-2009',
            'comment' => ''
        ];
    }

    public function registerData($email)
    {
        return [
            'firstname' => 'Dmitro',
            'lastname' => 'Sazonenko',
            'email' => $email,
            'gender' => 'male',
            'password' => 'everest1024',
            'confirm_password' => 'everest1024',
            'phone' => '89889917443'
        ];
    }

    public function getMutationTestData($type, $param = false)
    {
        $method = $type . 'Data';
        if($param) {
            $result = $this->$method($param);
        } else {
            $result = $this->$method();
        }
        return [
            'input' => $result
        ];
    }
}