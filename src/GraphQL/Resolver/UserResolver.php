<?php
namespace App\GraphQL\Resolver;

use App\Repository\UsersRepository;
use App\Service\AuthenticatorService;
use Doctrine\ORM\EntityManager;
use GraphQL\Error\UserError;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class UserResolver extends AuthAlias {

    public $em;
    /**
     * @var UsersRepository
     */
    public $usersRepository;

    public function __construct(
        EntityManager $em,
        UsersRepository $usersRepository,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService
    ) {
        parent::__construct($em, $container, $authenticatorService);
        $this->em = $em;
        $this->usersRepository = $usersRepository;
    }

    public function resolve(Argument $args)
    {
        if(!$this->getUser()) {
            throw new UserError('User not authorized!');
        }
        return $this->usersRepository->find($this->getUser()->getId());
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'User'
        ];
    }
}