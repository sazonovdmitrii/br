<?php

namespace App\GraphQL\Mutation;

use App\Entity\OrderItem;
use App\Entity\ProductItem;
use App\Entity\Orders;
use App\Repository\AddressRepository;
use App\Repository\CourierRepository;
use App\Repository\PaymentMethodRepository;
use App\Repository\PickupRepository;
use App\Repository\ProductItemRepository;
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
    /**
     * @var PickupRepository
     */
    private $pickupRepository;
    /**
     * @var CourierRepository
     */
    private $courierRepository;
    /**
     * @var PaymentMethodRepository
     */
    private $paymentMethodRepository;
    /**
     * @var AddressRepository
     */
    private $addressRepository;
    /**
     * @var ProductItemRepository
     */
    private $productItemRepository;

    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService,
        ObjectManager $manager,
        UserService $userService,
        PickupRepository $pickupRepository,
        CourierRepository $courierRepository,
        PaymentMethodRepository $paymentMethodRepository,
        AddressRepository $addressRepository,
        ProductItemRepository $productItemRepository
    ) {
        $this->manager              = $manager;
        $this->redis                = $redis;
        $this->em                   = $em;
        $this->basketService        = $basketService;
        $this->authenticatorService = $authenticatorService;
        parent::__construct($redis, $container, $authenticatorService, $userService);
        $this->pickupRepository = $pickupRepository;
        $this->courierRepository = $courierRepository;
        $this->paymentMethodRepository = $paymentMethodRepository;
        $this->addressRepository = $addressRepository;
        $this->productItemRepository = $productItemRepository;
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

            if(!$input->courier_id && !$input->pickup_code) {
                throw new UserError('Необходимо указать хотя бы один метод доставки.');
            }

            if($input->pickup_code) {
                $order->setPickup(
                    $this->pickupRepository->find($input->pickup_code)
                );
            }

            if($input->courier_id) {
                $order->setCourier(
                    $this->courierRepository->find($input->courier_id)
                );
            }

            $order->setLenses($input->lenses);

            if(!$input->payment_method_code) {
                throw new UserError('Необходимо указать способ оплаты.');
            }

            $order->setPaymentMethodCode($input->payment_method_code);

            if($input->courier_id && !$input->address_id) {
                throw new UserError('Необходимо указать способ адрес для курьерской доставки.');
            }

            $order->setAddressId(
                $this->addressRepository->find($input->address_id)
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

            $productItem = $this->productItemRepository->find($basketItem['item']->getId());
            if($productItem) {
                $orderItem->setItem($productItem);
            }
            $orderItem->setLenses(json_encode($basketItem['lenses']));

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
            'id' => $order->getId(),
            'secret_key' => $order->getSecretKey()
        ];
    }
}