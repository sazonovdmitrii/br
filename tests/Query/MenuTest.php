<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class MenuTest
 *
 * @package App\Tests\Query
 */
class MenuTest extends GraphQLTesting
{
    public function testMenu()
    {
        $menu = $this->graphqlQuery($this->getQueryTestQuery('menu'));

        $this->assertArraySubset([
            'data' => [
                'menu' => [
                    'data' => []
                ]
            ]
        ], $menu);
    }
}
