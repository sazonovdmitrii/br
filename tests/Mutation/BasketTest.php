<?php

namespace App\Tests\Mutation;

use App\Tests\GraphQLTesting;

/**
 * Class AddBasketTest
 *
 * @package App\Tests\Mutation
 */
class BasketTest extends GraphQLTesting
{
    /**
     * @throws \ErrorException
     */
    public function testAddBasket()
    {
        $basket = $this->graphqlQuery(
            $this->getMutationTestQuery('addBasket'), $this->getMutationTestData('addBasket'), $this->getToken()
        );

        $this->assertArraySubset([
            'data' => [
                'addBasket' => [
                    'products' => []
                ]
            ]
        ], $basket);
        $products = $basket['data']['addBasket']['products'];
        $this->assertNotEmpty($products);

        $this->assertArraySubset([
            'qty',
            'price',
            'name',
            'item',
            'url',
            'lense'
        ], array_keys($products[0]));

        $this->assertArraySubset([
            'lense' => [
                'recipes' => [
                    'sides' => [
                        'left' => [

                        ]
                    ]
                ]
            ]
        ], $products[0]);
    }

    public function testRemoveBasket()
    {
        $basket = $this->graphqlQuery(
            $this->getMutationTestQuery('addBasket'), $this->getMutationTestData('addBasket'), $this->getToken()
        );
        $itemId = $basket['data']['addBasket']['products'][0]['item']['id'];
        $removeBasket = $this->graphqlQuery(
            $this->getMutationTestQuery('removeBasket'), [
                'input' => [
                    'item_id' => $itemId
                ]
            ], $this->getToken()
        );
        $this->assertArraySubset([
            'data' => [
                'removeBasket' => [
                    'products' => []
                ]
            ]
        ], $removeBasket);
    }

    public function testUpdateBasket()
    {
        $token = $this->getToken();
        $basket = $this->graphqlQuery(
            $this->getMutationTestQuery('addBasket'), $this->getMutationTestData('addBasket'), $token
        );
        $itemId = $basket['data']['addBasket']['products'][0]['item']['id'];

        $updateBasket = $this->graphqlQuery(
            $this->getMutationTestQuery('updateBasket'), [
                'input' => [
                    'item_id' => $itemId,
                    'qty' => 58
                ]
            ], $token
        );

        $this->assertArraySubset([
            'data' => [
                'updateBasket' => [
                    'products' => []
                ]
            ]
        ], $updateBasket);

        $products = $updateBasket['data']['updateBasket']['products'];

        $this->assertNotEmpty($products);

        $qty = 0;
        foreach($products as $product) {
            if($product['item']['id'] == $itemId) {
                $qty = $product['qty'];
            }
        }
        $this->assertEquals($qty, 58);
    }
}
