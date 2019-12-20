<?php

namespace App\GraphQL\Mutation;

use App\Service\AuthenticatorService;
use App\Service\UserService;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Psr\Log\LoggerInterface;

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
        $this->userService          = $userService;
        $this->authenticatorService = $authenticatorService;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
        }

        $token = $authenticatorService->setRequest($this->request)->getAuth('token');

        $locale = $this->request->headers->get('Locale');
        $this->setLocale($locale);

        if ($token && $user = $authenticatorService->authByToken($token)) {
            $this->user = $user;
            return;
        }
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

    public function getAuth($type)
    {
        return $this->authenticatorService->getAuth($type);
    }
}