<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class AddressesTest
 *
 * @package App\Tests\Mutation
 */
class AddressesTest extends GraphQLTesting
{
    public function testAddresses()
    {
        $addresses = $this->graphqlQuery($this->getQueryTestQuery('addresses'), [], $this->getToken());

        $this->assertArraySubset([
            'data' => [
                'addresses' => [
                    'data' => []
                ]
            ]
        ], $addresses);

        $addresses = $addresses['data']['addresses']['data'];
        $this->assertNotEmpty($addresses);

        $this->assertArraySubset([
            'id',
            'name',
            'user_id',
            'region_id',
            'city',
            'street',
        ], array_keys($addresses[0]));
    }

    public function testAddressById()
    {
        $addressById = $this->graphqlQuery($this->getQueryTestQuery('addressById'));

        $this->assertArraySubset([
            'data' => [
                'address' => []
            ]
        ], $addressById);

        $addressById = $addressById['data']['address'];
        $this->assertNotEmpty($addressById);

        $this->assertArraySubset([
            'id',
            'name'
        ], array_keys($addressById));
    }
}
