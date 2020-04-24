<?php
namespace App\Tests\Mutation;

use App\Tests\GraphQLTesting;

/**
 * Class InstashopTest
 *
 * @package App\Tests\Mutation
 */
class InstashopTest extends GraphQLTesting
{
    public function testClick()
    {
        $token = $this->getToken();
        $click = $this->graphqlQuery(
            $this->getMutationTestQuery('instashopClick'), $this->getMutationTestData('instashopClick'), $token
        );
        $this->assertArraySubset([
            'data' => [
                'instashopClick' => [

                ]
            ]
        ], $click);
        $click = $click['data']['instashopClick'];
        $this->assertNotEmpty($click);
    }

    public function testPurchase()
    {
        $token = $this->getToken();
        $purchase = $this->graphqlQuery(
            $this->getMutationTestQuery('instashopPurchases'), $this->getMutationTestData('instashopPurchases'), $token
        );
        $this->assertArraySubset([
            'data' => [
                'instashopPurchases' => [

                ]
            ]
        ], $purchase);
        $purchase = $purchase['data']['instashopPurchases'];
        $this->assertNotEmpty($purchase);
    }
}
