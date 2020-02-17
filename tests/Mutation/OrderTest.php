<?php
namespace App\Tests\Mutation;

use App\Tests\GraphQLTesting;

/**
 * Class OrderTest
 *
 * @package App\Tests\Mutation
 */
class OrderTest extends GraphQLTesting
{
    /**
     * @throws \ErrorException
     */
    public function testCreateOrder()
    {
        $createOrder = $this->graphqlQuery(
            $this->getMutationTestQuery('createOrder'), $this->getMutationTestData('createOrder'), $this->getToken()
        );

        $this->assertArraySubset([
            'data' => [
                'order' => []
            ]
        ], $createOrder);
        $order = $createOrder['data']['order'];
        $this->assertNotEmpty($order);

        $this->assertArraySubset([
            'id',
            'secret_key'
        ], array_keys($order));
    }
}
