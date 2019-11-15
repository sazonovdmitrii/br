<?php

namespace App\GraphQL\Mutation;

use App\Service\AuthenticatorService;
use App\Service\UserService;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AuthMutation implements MutationInterface
{
    public $user;

    private $authenticatorService;

    private $request;

    private $args;

    private $userService;

    private $locale = 'ru';

    public function __construct(
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        UserService $userService
    ) {
        $this->redis                = $redis;
        $this->authenticatorService = $authenticatorService;
        $this->userService          = $userService;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
        }
        $token = $this->getAuth('token');

        $locale = $this->request->headers->get('Locale');
        $this->setLocale($locale);

        if ($token && $user = $this->authenticatorService->authByToken($token)) {
            $this->user = $user;
            return;
        }
    }

    public function getAuth($param)
    {
        $token = '';
        if ($this->request) {
            $auth = str_replace('Authorization: ', '', $this->request->headers->get('Authorization'));

            $authData = explode(';', $auth);
            if (count($authData)) {
                foreach ($authData as $authItem) {
                    $authItem = explode('=', $authItem);
                    if (count($authItem) == 2 && $authItem[0] == $param) {
                        $token = $authItem[1];
                    }
                }
            }
        }
        return $token;
    }

    public function getUser()
    {
        if ($this->user) {
            return $this->user;
        }
        return false;
    }

    public function getAuthKey()
    {
        return ($this->getUser()) ? $this->getUser()->getId() : $this->getAuth('session');
    }

    public function setArgs($args)
    {
        $this->args = $args;
        return $this;
    }

    public function getArgs()
    {
        return $this->args;
    }

    public function checkPasswords()
    {
        if ($this->getArgs()->password == $this->getArgs()->confirm_password) {
            return true;
        }
        return false;
    }

    public function checkEmail()
    {
        return $this->userService->byEmail($this->getArgs()->email);
    }

    public function getLocale()
    {
        return $this->locale;
    }

    public function setLocale($locale)
    {
        $this->locale = $locale;
        return $this;
    }
}