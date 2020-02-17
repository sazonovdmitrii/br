<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class BlockTest
 *
 * @package App\Tests\Mutation
 */
class CitiesTest extends GraphQLTesting
{
    public function testCities()
    {
        $cities = $this->graphqlQuery($this->getQueryTestQuery('cities'));

        $this->assertArraySubset([
            'data' => [
                'cities' => [
                    'data' => [

                    ]
                ]
            ]
        ], $cities);

        $cities = $cities['data']['cities']['data'];
        $this->assertNotEmpty($cities);

        $this->assertArraySubset([
            'id',
            'latitude',
            'longitude'
        ], array_keys($cities[0]));
    }
}
