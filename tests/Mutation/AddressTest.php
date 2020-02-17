<?php
namespace App\Tests\Mutation;

use App\Tests\GraphQLTesting;

/**
 * Class UserTest
 *
 * @package App\Tests\Mutation
 */
class AddressTest extends GraphQLTesting
{
    /**
     * @throws \ErrorException
     */
    public function testCreate()
    {
        $createAddress = $this->graphqlQuery(
            $this->getMutationTestQuery('createAddress'), $this->getMutationTestData('createAddress'), $this->getToken()
        );

        $this->assertArraySubset([
            'data' => [
                'createAddress' => []
            ]
        ], $createAddress);
        $address = $createAddress['data']['createAddress'];
        $this->assertNotEmpty($address);

        $this->assertArraySubset([
            'id',
            'name',
            'user_id'
        ], array_keys($address));
    }

    public function testDelete()
    {
        $address = $this->graphqlQuery(
            $this->getMutationTestQuery('createAddress'), $this->getMutationTestData('createAddress'), $this->getToken()
        );
        $addressId = $address['data']['createAddress']['id'];

        $address = $this->graphqlQuery(
            $this->getMutationTestQuery('deleteAddress'), [
                'input' => [
                    'id' => $addressId
                ]
            ], $this->getToken()
        );
        $this->assertArraySubset([
            'data' => [
                'removeAddress' => []
            ]
        ], $address);
    }

    public function testUpdate()
    {
        $address = $this->graphqlQuery(
            $this->getMutationTestQuery('createAddress'), $this->getMutationTestData('createAddress'), $this->getToken()
        );
        $addressId = $address['data']['createAddress']['id'];

        $updatedAddress = $this->graphqlQuery(
            $this->getMutationTestQuery('updateAddress'), [
                'input' => [
                    'id' => $addressId,
                    'name' => 'Rostov 123'
                ]
            ], $this->getToken()
        );
        $addresses = $updatedAddress['data']['updateAddress']['data'];
        $address = $this->graphqlQuery($this->getQueryTestQuery('address', $addressId));
        $this->assertArraySubset([
            'data' => [
                'address' => []
            ]
        ], $address);
        $addressName = $address['data']['address']['name'];
        $this->assertEquals($addressName, 'Rostov 123');
    }
}
