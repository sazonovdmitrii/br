<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class BasketTest
 *
 * @package App\Tests\Mutation
 */
class BasketTest extends GraphQLTesting
{
    public function testBasket()
    {
        $token = $this->getToken();
        $this->graphqlQuery(
            $this->getMutationTestQuery('addBasket'), $this->getMutationTestData('addBasket'), $token
        );
        $basket = $this->graphqlQuery($this->getQueryTestQuery('basket'), [], $token);

        $this->assertArraySubset([
            'data' => [
                'basket' => [
                    'products' => []
                ]
            ]
        ], $basket);

        $products = $basket['data']['basket']['products'];
        $this->assertNotEmpty($products);

        $this->assertArraySubset([
            'qty',
            'name'
        ], array_keys($products[0]));
    }
}
