<?php
namespace App\GraphQL\Mutation;

use App\Service\BasketService;
use App\GraphQL\Input\AddBasketInput;
use App\GraphQL\Input\UpdateBasketInput;
use App\Service\AuthenticatorService;
use Overblog\GraphQLBundle\Definition\Argument;
use Doctrine\ORM\EntityManager;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\UserService;

class BasketMutation extends AuthMutation
{
    private $authenticatorService;

    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService,
        UserService $userService
    ) {
        $this->redis = $redis;
        $this->em = $em;
        $this->basketService = $basketService;
        $this->authenticatorService = $authenticatorService;
        parent::__construct($redis, $container, $authenticatorService, $userService);
    }

    public function add(Argument $args)
    {
        $input = new AddBasketInput($args);
        if($input->item_id) {
            $productItem = $this->em
                ->getRepository('App:ProductItem')
                ->find($input->item_id);

            return $this->basketService
                ->setAuthKey($this->getAuthKey())
                ->add($productItem->getId(), $input->lenses);
        }
    }

    public function remove(Argument $args)
    {
        $input = new AddBasketInput($args);

        if($input->item_id) {
            return $this->basketService
                ->setAuthKey($this->getAuthKey())
                ->remove($input->item_id);
        }
    }

    public function update(Argument $args)
    {
        $input = new UpdateBasketInput($args);

        if($input->item_id) {
            return $this->basketService
                ->setAuthKey($this->getAuthKey())
                ->setLocale($this->getLocale())
                ->update($input->item_id, $input->qty);
        }
    }
}