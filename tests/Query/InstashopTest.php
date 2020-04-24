<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class BlockTest
 *
 * @package App\Tests\Mutation
 */
class InstashopTest extends GraphQLTesting
{
    public function testCities()
    {
        $images = $this->graphqlQuery($this->getQueryTestQuery('instashopImages'));

        $this->assertArraySubset([
            'data' => [
                'instashop_images' => [
                    'data' => [

                    ]
                ]
            ]
        ], $images);

        $images = $images['data']['instashop_images']['data'];
        $this->assertNotEmpty($images);

        $this->assertArraySubset([
            'id',
            'path',
            'tag'
        ], array_keys($images[0]));
    }
}
