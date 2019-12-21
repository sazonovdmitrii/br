<?php
namespace App\GraphQL\Resolver;

use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class UserResolver implements ResolverInterface, AliasedInterface {

    private $em;
    /**
     * @var UsersRepository
     */
    private $usersRepository;

    public function __construct(
        EntityManager $em,
        UsersRepository $usersRepository
    ) {
        $this->em = $em;
        $this->usersRepository = $usersRepository;
    }

    public function resolve(Argument $args)
    {
        return $this->usersRepository->find($args['id']);
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'User'
        ];
    }
}