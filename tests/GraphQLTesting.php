<?php

namespace App\Tests;

use PHPUnit\Framework\TestCase;

/**
 * Class GraphQLTesting
 *
 * @package App\Tests\Controller
 */
class GraphQLTesting extends TestCase
{
    use MutationTestData;
    use MutationQueryData;
    use QueryData;

    const ENDPOINT = 'http://127.0.0.1:1343/api/graphql/';

    /**
     * @param string $query
     * @param array $variables
     * @param string|null $token
     * @return mixed
     * @throws \ErrorException
     */
    public function graphqlQuery(string $query, array $variables = [], ?string $token = null)
    {
        $headers = ['Content-Type: application/json'];

        if (null !== $token) {
            $headers[] = 'Authorization: session=hY3LQTeCYajU0UrBZ4EQx;token=' . $token;
        }

        if (false === $data = @file_get_contents(self::ENDPOINT, false, stream_context_create([
                'http' => [
                    'method' => 'POST',
                    'header' => $headers,
                    'content' => json_encode(['query' => $query, 'variables' => $variables]),
                ]
            ]))) {
            $error = error_get_last();
            throw new \ErrorException($error['message'], $error['type']);
        }
        return json_decode($data, true);
    }

    public function getToken($type = 'auth')
    {
        $auth = $this->graphqlQuery(
            $this->getMutationTestQuery('auth'), $this->getMutationTestData($type)
        );
        return $auth['data']['auth']['hash'];
    }
}