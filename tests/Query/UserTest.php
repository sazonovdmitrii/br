<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class CatalogTest
 *
 * @package App\Tests\Mutation
 */
class UserTest extends GraphQLTesting
{
    public function testUserById()
    {
        $userById = $this->graphqlQuery($this->getQueryTestQuery('userById'), [], $this->getToken());

        $this->assertArraySubset([
            'data' => [
                'user' => []
            ]
        ], $userById);

        $user = $userById['data']['user'];
        $this->assertNotEmpty($user);

        $this->assertArraySubset([
            'id',
            'confirmationToken'
        ], array_keys($user));
    }
}
