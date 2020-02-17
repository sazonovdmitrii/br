<?php
namespace App\Tests\Mutation;

use App\Tests\GraphQLTesting;

/**
 * Class UserTest
 *
 * @package App\Tests\Mutation
 */
class UserTest extends GraphQLTesting
{
    /**
     * @throws \ErrorException
     */
    public function testAuth()
    {
        $auth = $this->graphqlQuery($this->getMutationTestQuery('auth'), $this->getMutationTestData('auth'));
        $this->_authTest($auth);
    }

    public function testRegister()
    {
        $email = 'sazon' . time() . '@nxt.ru';
        $register = $this->graphqlQuery(
            $this->getMutationTestQuery('register'), $this->getMutationTestData('register', $email)
        );
        $auth = $this->graphqlQuery($this->getMutationTestQuery('auth'), $this->getMutationTestData('auth', $email));
        $this->_authTest($auth);
    }

    public function testRestorePassword()
    {
        $restore = $this->graphqlQuery(
            $this->getMutationTestQuery('restore'), $this->getMutationTestData('restore')
        );

        $this->assertArraySubset([
            'data' => [
                'restore' => [

                ]
            ]
        ], $restore);

        $this->assertArraySubset([
            'message',
            'success'
        ], array_keys($restore['data']['restore']));

        $userById = $this->graphqlQuery(
            $this->getQueryTestQuery('userById'), [], $this->getToken()
        );

        $confirmationToken = $userById['data']['user']['confirmationToken'];

        $tokenValid = $this->graphqlQuery(
            $this->getMutationTestQuery('isTokenValid'), [
                'input' => [
                    'token' => $confirmationToken
                ]
            ]
        );

        $this->assertArraySubset([
            'data' => [
                'isTokenValid' => [

                ]
            ]
        ], $tokenValid);


        $this->graphqlQuery(
            $this->getMutationTestQuery('changePassword'), [
                'input' => [
                    'token' => $confirmationToken,
                    'password' => '123'
                ]
            ]
        );

        $this->graphqlQuery(
            $this->getMutationTestQuery('auth'), $this->getMutationTestData('tempAuth')
        );
        $this->graphqlQuery(
            $this->getMutationTestQuery('restore'), $this->getMutationTestData('restore')
        );
        $userById = $this->graphqlQuery(
            $this->getQueryTestQuery('userById'), [], $this->getToken('tempAuth')
        );
        $confirmationToken = $userById['data']['user']['confirmationToken'];
        $this->graphqlQuery(
            $this->getMutationTestQuery('changePassword'), [
                'input' => [
                    'token' => $confirmationToken,
                    'password' => 'everest1024'
                ]
            ]
        );
        $auth = $this->graphqlQuery(
            $this->getMutationTestQuery('auth'), $this->getMutationTestData('auth')
        );
        $this->_authTest($auth);
    }

    public function testUpdateUser()
    {
        $updateUser = $this->graphqlQuery(
            $this->getMutationTestQuery('updateUser'), [
                'input' => [
                    'id' => '1',
                    'firstname' => 'Dmitrio',
                    'lastname' => 'Sazonenko'
                ]
            ], $this->getToken()
        );
        $user = $updateUser['data']['updateUser'];
        $this->assertEquals($user['firstname'], 'Dmitrio');
        $this->assertEquals($user['lastname'], 'Sazonenko');
        $this->graphqlQuery(
            $this->getMutationTestQuery('updateUser'), [
                'input' => [
                    'id' => '1',
                    'firstname' => 'Dmitry',
                    'lastname' => 'Sazonov'
                ]
            ], $this->getToken()
        );
    }

    private function _authTest($auth)
    {
        $this->assertArraySubset([
            'data' => [
                'auth' => [

                ]
            ]
        ], $auth);

        $this->assertArraySubset([
            'id',
            'hash'
        ], array_keys($auth['data']['auth']));

        $this->assertNotEmpty($auth['data']['auth']['hash']);
    }
}
