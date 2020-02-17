<?php
namespace App\GraphQL\Mutation;

use App\Repository\CouponsRepository;
use App\Repository\ProductItemRepository;
use App\Service\BasketService;
use App\GraphQL\Input\CouponInput;
use App\Service\AuthenticatorService;
use GraphQL\Error\UserError;
use Overblog\GraphQLBundle\Definition\Argument;
use Doctrine\ORM\EntityManager;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\UserService;

/**
 * Class CouponMutation
 *
 * @package App\GraphQL\Mutation
 */
class CouponMutation extends AuthMutation
{
    private $productItemRepository;
    /**
     * @var CouponsRepository
     */
    private $couponsRepository;

    /**
     * CouponMutation constructor.
     *
     * @param EntityManager $em
     * @param Redis $redis
     * @param ContainerInterface $container
     * @param AuthenticatorService $authenticatorService
     * @param BasketService $basketService
     * @param UserService $userService
     * @param ProductItemRepository $productItemRepository
     * @param CouponsRepository $couponsRepository
     */
    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService,
        UserService $userService,
        ProductItemRepository $productItemRepository,
        CouponsRepository $couponsRepository
    ) {
        $this->redis = $redis;
        $this->em = $em;
        $this->basketService = $basketService;
        $this->productItemRepository = $productItemRepository;
        $this->couponsRepository = $couponsRepository;
        parent::__construct($redis, $container, $authenticatorService, $userService);
    }

    /**
     * @param Argument $args
     * @return array
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function apply(Argument $args)
    {
        $input = new CouponInput($args);
        if($input->coupon) {
            $coupon = $this->couponsRepository->findByCode($input->coupon);

            if(!$coupon) {
                throw new UserError('Вы ввели неверный промокод.');
            }

            return $this->basketService
                ->setCoupon($coupon)
                ->setAuthKey($this->getAuthKey())
                ->apply()
                ->getAll();
        }
    }
}