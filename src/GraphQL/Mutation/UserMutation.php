<?php

namespace App\GraphQL\Mutation;

use App\Form\Type\UserType;
use App\GraphQL\Input\ChangePasswordInput;
use App\GraphQL\Input\RegisterInput;
use App\GraphQL\Input\TokenInput;
use App\GraphQL\Input\UpdateUserInput;
use App\GraphQL\Input\UserInput;
use App\Repository\UsersRepository;
use App\Security\TokenGenerator;
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
use App\GraphQL\Input\RestoreInput;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Class UserMutation
 *
 * @package App\GraphQL\Mutation
 */
class UserMutation extends AuthMutation
{
    /**
     * @var JWTTokenManagerInterface
     */
    private $jwtManager;

    /**
     * @var AuthenticatorService
     */
    private $authenticatorService;

    /**
     * @var UserService
     */
    private $userService;

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var UsersRepository
     */
    private $usersRepository;

    /**
     * @var TokenGenerator
     */
    private $tokenGenerator;
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * UserMutation constructor.
     *
     * @param Redis $redis
     * @param ContainerInterface $container
     * @param AuthenticatorService $authenticatorService
     * @param JWTTokenManagerInterface $JWTManager
     * @param UserService $userService
     * @param BasketService $basketService
     * @param EntityManager $entityManager
     * @param UsersRepository $usersRepository
     * @param TokenGenerator $tokenGenerator
     * @param UserPasswordEncoderInterface $passwordEncoder
     */
    public function __construct(
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        JWTTokenManagerInterface $JWTManager,
        UserService $userService,
        BasketService $basketService,
        EntityManager $entityManager,
        UsersRepository $usersRepository,
        TokenGenerator $tokenGenerator,
        UserPasswordEncoderInterface $passwordEncoder
    ) {
        $this->redis                = $redis;
        $this->authenticatorService = $authenticatorService;
        $this->jwtManager           = $JWTManager;
        $this->userService          = $userService;
        $this->basketService        = $basketService;
        $this->entityManager        = $entityManager;
        $this->usersRepository      = $usersRepository;
        $this->tokenGenerator = $tokenGenerator;
        $this->passwordEncoder = $passwordEncoder;
        parent::__construct($redis, $container, $authenticatorService, $userService);
    }

    /**
     * @param Argument $args
     * @return mixed
     */
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

    /**
     * @param Argument $args
     * @return mixed
     */
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

    /**
     * @param Argument $args
     * @return \App\Entity\Users|array|bool|null
     */
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

    /**
     * @param Argument $args
     * @return array
     */
    public function restore(Argument $args)
    {
        $loginArgs = new RestoreInput($args);

        $user = $this->usersRepository->findOneBy(['email' => $loginArgs->login]);

        if(!$user) {
            throw new UserError('Учетная запись не найдена.');
        }

        $user->setConfirmationToken($this->tokenGenerator->getRandomSecureToken(30));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return [
            'success' => true,
            'message' => 'Инструкции для восстановления пароля были высланы на Вашу почту.'
        ];
    }

    public function isTokenValid(Argument $args)
    {
        $tokenArgs = new TokenInput($args);

        if(!$tokenArgs->token) {
            throw new UserError('Token is required');
        }

        $user = $this->usersRepository->findOneBy(
            ['confirmationToken' => $tokenArgs->token]
        );

        if(!$user) {
            throw new UserError('User not found');
        }
    }

    /**
     * @param Argument $args
     * @return \App\Entity\Users|null
     */
    public function changePassword(Argument $args)
    {
        $passwordArgs = new ChangePasswordInput($args);

        if(!$passwordArgs->token || !$passwordArgs->password) {
            throw new UserError('Token and password are required');
        }

        $user = $this->usersRepository->findOneBy(
            ['confirmationToken' => $passwordArgs->token]
        );

        if(!$user) {
            throw new UserError('User not found');
        }

        $user->setPassword($this->passwordEncoder->encodePassword(
                $user, $passwordArgs->password
            )
        );
        $user->setConfirmationToken('');

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }
}