<?php
namespace App\GraphQL\Resolver;

use App\Repository\UsersRepository;
use App\Service\AuthenticatorService;
use App\Service\LenseService;
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
    /**
     * @var LenseService
     */
    private $lenseService;

    public function __construct(
        EntityManager $em,
        UsersRepository $usersRepository,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        LenseService $lenseService
    ) {
        parent::__construct($em, $container, $authenticatorService);
        $this->em = $em;
        $this->usersRepository = $usersRepository;
        $this->lenseService = $lenseService;
    }

    public function resolve(Argument $args)
    {
        if(!$this->getUser()) {
            throw new UserError('User not authorized!');
        }
        $user = $this->usersRepository->find($this->getUser()->getId());
        $recipes = [];
        foreach($user->getRecipes() as $recipe) {
            $recipes[] = $this->lenseService->parse($recipe->getRecipe());
        }
        $user->setRecipes($recipes);
        return $user;
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'User'
        ];
    }
}