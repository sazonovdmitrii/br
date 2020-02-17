<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class BlockTest
 *
 * @package App\Tests\Mutation
 */
class BlockTest extends GraphQLTesting
{
    public function testBasket()
    {
        $block = $this->graphqlQuery($this->getQueryTestQuery('block'));

        $this->assertArraySubset([
            'data' => [
                'block' => []
            ]
        ], $block);

        $block = $block['data']['block'];
        $this->assertNotEmpty($block);

        $this->assertArraySubset([
            'title',
            'name',
            'content'
        ], array_keys($block));
    }
}
