<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class StoreTest
 *
 * @package App\Tests\Query
 */
class StoreTest extends GraphQLTesting
{
    public function testStore()
    {
        $store = $this->graphqlQuery($this->getQueryTestQuery('store'));

        $this->assertArraySubset([
            'data' => [
                'store' => []
            ]
        ], $store);

        $store = $store['data']['store'];

        $this->assertArraySubset([
            'id',
            'name',
            'latitude',
            'visible',
            'full_name',
            'longitude'
        ], array_keys($store));
    }
}
