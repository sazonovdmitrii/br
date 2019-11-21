<?php
namespace App\GraphQL\Mutation;

use App\GraphQL\Input\CreateAddressInput;
use App\GraphQL\Input\UpdateAddressInput;
use App\Service\AddressService;
use App\Service\AuthenticatorService;
use Overblog\GraphQLBundle\Definition\Argument;
use Doctrine\ORM\EntityManager;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\UserService;

class AddressMutation extends AuthMutation
{
    private $authenticatorService;

    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        AddressService $addressService,
        UserService $userService
    ) {
        $this->redis = $redis;
        $this->em = $em;
        $this->addressService = $addressService;
        $this->authenticatorService = $authenticatorService;
        parent::__construct($redis, $container, $authenticatorService, $userService);
    }

    public function create(Argument $args)
    {
        $input = new CreateAddressInput($args);

        $address = [];

        if($authKey = $this->getAuthKey()) {
            $address = $this->addressService
                ->setData($input);
            if(is_int($authKey)) {
                $address->setUserId($authKey);
            } else {
                $address->setSessionKey($authKey);
            }
            return $address->create();
        }
        return [];
    }

    public function update(Argument $args)
    {
        $input = new UpdateAddressInput($args);

        if($userId = $this->getAuthKey()) {
            if(is_int($userId)) {
                $this->addressService
                    ->setAddressId($input->id)
                    ->setData($input)
                    ->update();

                return [
                    'data' => $this->getUser()->getAddresses()
                ];
            }
        }

        return [
            'data' => []
        ];
    }

    public function remove(Argument $args)
    {
        $input = new UpdateAddressInput($args);

        if($authKey = $this->getAuthKey()) {
            if(is_int($authKey)) {
                $this->addressService
                    ->setAddressId($input->id)
                    ->remove();

                return [
                    'data' => $this->getUser()->getAddresses()
                ];
            } else {
                $this->addressService
                    ->setAddressId($input->id)
                    ->remove();
            }
        }

        return [
            'data' => []
        ];
    }
}