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

/**
 * Class AddressMutation
 *
 * @package App\GraphQL\Mutation
 */
class AddressMutation extends AuthMutation
{
    private $authenticatorService;

    /**
     * AddressMutation constructor.
     *
     * @param EntityManager $em
     * @param Redis $redis
     * @param ContainerInterface $container
     * @param AuthenticatorService $authenticatorService
     * @param AddressService $addressService
     * @param UserService $userService
     */
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

    /**
     * @param Argument $args
     * @return \App\Entity\Address|array
     */
    public function create(Argument $args)
    {
        $input = new CreateAddressInput($args);

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

    /**
     * @param Argument $args
     * @return array
     */
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

    /**
     * @param Argument $args
     * @return array
     */
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
            'success' => true,
            'message' => 'Адрес удален'
        ];
    }
}