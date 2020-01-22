<?php

namespace App\GraphQL\Mutation;

use App\Form\Type\UserType;
use App\GraphQL\Input\RegisterInput;
use App\GraphQL\Input\UpdateUserInput;
use App\GraphQL\Input\UserInput;
use App\Repository\UsersRepository;
use App\Service\AuthenticatorService;
use App\Service\BasketService;
use App\Service\UserService;
use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Error\UserError;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\Forms;

class UserMutation extends AuthMutation
{
    private $jwtManager;

    private $authenticatorService;

    private $userService;
    /**
     * @var EntityManager
     */
    private $entityManager;
    /**
     * @var UsersRepository
     */
    private $usersRepository;

    public function __construct(
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        JWTTokenManagerInterface $JWTManager,
        UserService $userService,
        BasketService $basketService,
        EntityManager $entityManager,
        UsersRepository $usersRepository
    ) {
        $this->redis                = $redis;
        $this->authenticatorService = $authenticatorService;
        $this->jwtManager           = $JWTManager;
        $this->userService          = $userService;
        $this->basketService        = $basketService;
        $this->entityManager        = $entityManager;
        $this->usersRepository      = $usersRepository;
        parent::__construct($redis, $container, $authenticatorService, $userService);
    }

    public function auth(Argument $args)
    {
        $input = new UserInput($args);

        if ($user = $this->authenticatorService->auth($input->email, $input->password)) {
            $user->setHash($this->jwtManager->create($user));

            $this->basketService->updateCartForUser($this->getAuthKey(), $user->getId());

            return $user;
        }
        throw new UserError('Введенные вами данные не соответствуют ни одной учетной записи!');
    }

    public function register(Argument $args)
    {
        $input = new RegisterInput($args);

        $this->setArgs($input);

        if (!$this->checkPasswords()) {
            throw new UserError('Введенные пароли не совпадают.');
        }

        if ($this->checkEmail()) {
            throw new UserError('Пользователь ранее зарегистрирован.');
        }

        $this->userService->create($input);

        if ($user = $this->authenticatorService->auth($input->email, $input->password)) {
            $user->setHash($this->jwtManager->create($user));
            return $user;
        }

        return $user;
    }

    public function update(Argument $args)
    {
        $user  = $this->getUser();

        if (!$user) {
            throw new UserError('Authorization required');
        }

        $userArgs = new UpdateUserInput($args);

        $user = $this->usersRepository->find($userArgs->id);

        $formFactory = Forms::createFormFactory();
        $form        = $formFactory->create(UserType::class, $user);

        $form->submit((array)$userArgs);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        } else {
            return $form->getErrors();
        }

        return $user;
    }
}