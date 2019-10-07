<?php
namespace App\GraphQL\Mutation;

use App\GraphQL\Input\RegisterInput;
use App\GraphQL\Input\UserInput;
use App\Service\AuthenticatorService;
use App\Service\UserService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Overblog\GraphQLBundle\Error\UserError;

class UserMutation extends AuthMutation
{
    private $jwtManager;

    private $authenticator;

    private $authenticatorService;

    private $userService;

    public function __construct(
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        JWTTokenManagerInterface $JWTManager,
        UserService $userService
    ) {
        $this->redis = $redis;
        $this->authenticatorService = $authenticatorService;
        $this->jwtManager = $JWTManager;
        $this->userService = $userService;
        parent::__construct($redis, $container, $authenticatorService, $userService);
    }

    public function auth(Argument $args)
    {
        $input = new UserInput($args);

        if($user = $this->authenticatorService->auth($input->email, $input->password)) {
            $user->setHash($this->jwtManager->create($user));
            return $user;
        }
        throw new UserError('Введенные вами данные не соответствуют ни одной учетной записи!');
    }

    public function register(Argument $args)
    {
        $input = new RegisterInput($args);

        $this->setArgs($input);

        if(!$this->checkPasswords()) {
            throw new UserError('Введенные пароли не совпадают.');
        }

        if($this->checkEmail()) {
            throw new UserError('Пользователь ранее зарегистрирован.');
        }

        $this->userService->create($input);

        if($user = $this->authenticatorService->auth($input->email, $input->password)) {
            $user->setHash($this->jwtManager->create($user));
            return $user;
        }

        return $user;
    }
}