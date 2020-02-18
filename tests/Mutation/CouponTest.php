<?php

namespace App\Tests\Mutation;

use App\Tests\GraphQLTesting;

/**
 * Class AddBasketTest
 *
 * @package App\Tests\Mutation
 */
class CouponTest extends GraphQLTesting
{
    public function testApplyCoupon()
    {
        $token = $this->getToken();
        $this->graphqlQuery(
            $this->getMutationTestQuery('addBasket'), $this->getMutationTestData('addBasket'), $token
        );
        $coupon = $this->graphqlQuery(
            $this->getMutationTestQuery('coupon'), $this->getMutationTestData('coupon'), $token
        );
        $this->assertArraySubset([
            'data' => [
                'applyCoupon' => [
                    'products' => [

                    ]
                ]
            ]
        ], $coupon);
        $products = $coupon['data']['applyCoupon']['products'];
        $this->assertNotEmpty($products);

        $this->assertArraySubset([
            'name',
            'qty',
            'price',
            'coupon_price'
        ], array_keys($products[0]));
    }
}
