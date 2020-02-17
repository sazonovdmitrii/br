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
        $coupon = $this->graphqlQuery(
            $this->getMutationTestQuery('coupon'), $this->getMutationTestData('coupon'), $this->getToken()
        );
        $this->assertArraySubset([
            'data' => [
                'applyCoupon' => [
                    'products' => []
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
