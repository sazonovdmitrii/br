<?php
namespace App\GraphQL\Resolver;

use Overblog\GraphQLBundle\Definition\Argument;
use App\Service\BasketService;
use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\AuthenticatorService;
use Symfony\Component\HttpFoundation\RequestStack;

class BasketResolver extends AuthAlias
{
    private $basketService;
    /**
     * @var RequestStack
     */
    private $requestStack;

    public function __construct(
        EntityManager $em,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService,
        RequestStack $requestStack
    ) {
        $this->basketService = $basketService;
        $this->requestStack = $requestStack;
        parent::__construct($em, $container, $authenticatorService);
    }

    public function resolve(Argument $args)
    {
        $authKey = ($this->getUser()) ? $this->getUser()->getId() : $this->getAuth('session');

        $basket = $this->basketService
            ->setLocale($args['locale'])
            ->setAuthKey($authKey)
            ->getAll();
        return $basket;
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Basket'
        ];
    }
}