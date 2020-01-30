<?php
namespace App\GraphQL\Mutation;

use App\Repository\ProductItemRepository;
use App\Service\BasketService;
use App\GraphQL\Input\CouponInput;
use App\Service\AuthenticatorService;
use Overblog\GraphQLBundle\Definition\Argument;
use Doctrine\ORM\EntityManager;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\UserService;

class CouponMutation extends AuthMutation
{
    private $productItemRepository;

    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService,
        UserService $userService,
        ProductItemRepository $productItemRepository
    ) {
        $this->redis = $redis;
        $this->em = $em;
        $this->basketService = $basketService;
        parent::__construct($redis, $container, $authenticatorService, $userService);
        $this->productItemRepository = $productItemRepository;
    }

    public function apply(Argument $args)
    {
        $input = new CouponInput($args);
        if($input->coupon) {
            return $this->basketService
                ->setAuthKey($this->getAuthKey())
                ->setLocale($this->getLocale())
                ->getAll();
        }
    }
}