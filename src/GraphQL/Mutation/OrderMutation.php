<?php

namespace App\GraphQL\Mutation;

use App\Entity\OrderItem;
use App\Entity\ProductItem;
use App\Entity\Orders;
use App\Service\AuthenticatorService;
use App\Service\BasketService;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\GraphQL\Input\OrderInput;
use GraphQL\Error\UserError;
use App\Service\UserService;

class OrderMutation extends AuthMutation
{
    private $authenticatorService;

    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService,
        ObjectManager $manager,
        UserService $userService
    ) {
        $this->manager              = $manager;
        $this->redis                = $redis;
        $this->em                   = $em;
        $this->basketService        = $basketService;
        $this->authenticatorService = $authenticatorService;
        parent::__construct($redis, $container, $authenticatorService, $userService);
    }

    public function create(Argument $args)
    {
        $input = new OrderInput($args);

        $basket = $this->basketService
            ->setAuthKey($this->getAuthKey())
            ->getAll();

        $order = new Orders();

        $user  = $this->getUser();
        if ($user) {
            $order->setUserId($user);

            if(!$input->courier_id && !$input->pickup_id) {
                throw new UserError('Необходимо указать хотя бы один метод доставки.');
            }

            if($input->pickup_id) {
                $order->setPickup(
                    $this->em->getRepository('App:Pickup')
                        ->find($input->pickup_id)
                );
            }

            if($input->courier_id) {
                $order->setCourier(
                    $this->em->getRepository('App:Courier')
                        ->find($input->courier_id)
                );
            }

            $order->setLenses($input->lenses);

            if(!$input->payment_method_id) {
                throw new UserError('Необходимо указать способ оплаты.');
            }

            $paymentMethod = $this->em
                ->getRepository('App:PaymentMethod')
                ->find($input->payment_method_id);

            $order->setPaymentMethodId($paymentMethod);

            if($input->courier_id && !$input->address_id) {
                throw new UserError('Необходимо указать способ адрес для курьерской доставки.');
            }

            $order->setAddressId(
                $this->em->getRepository('App:Address')
                    ->find($input->address_id)
            );

            $order->setComment($input->comment);
            $order->setLenses($input->lenses);
        }

        if(!count($basket)) {
            return [
                'id' => null
            ];
        }

        foreach ($basket['products'] as $basketItem) {
            $orderItem = new OrderItem();
            $orderItem->setQty($basketItem['qty']);

            $productItem = $this->em
                ->getRepository(ProductItem::class)
                ->find($basketItem['item_id']);
            if($productItem) {
                $orderItem->setItem($productItem);
            }

            $this->manager->persist($orderItem);
            $this->manager->flush();

            $order->addOrderItem($orderItem);
        }

        $this->manager->persist($order);
        $this->manager->flush();

        $this->basketService
            ->setAuthKey($this->getAuthKey())
            ->delete();
        return [
            'id' => $order->getId()
        ];
    }
}