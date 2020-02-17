<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class OrderTest
 *
 * @package App\Tests\Query
 */
class OrderTest extends GraphQLTesting
{
    public function testOrder()
    {
        $createOrder = $this->graphqlQuery(
            $this->getMutationTestQuery('createOrder'), $this->getMutationTestData('createOrder'), $this->getToken()
        );
        $secretKey = $createOrder['data']['order']['secret_key'];
        $order = $this->graphqlQuery($this->getQueryTestQuery('order', $secretKey));

        $this->assertArraySubset([
            'data' => [
                'order' => [
                    'orderItems' => [

                    ]
                ]
            ]
        ], $order);

        $orderItems = $order['data']['order']['orderItems'];
        $this->assertNotEmpty($orderItems);

        $this->assertArraySubset([
            'item' => [
                'productItemTagItems' => []
            ]
        ], $orderItems[0]);
    }
}
