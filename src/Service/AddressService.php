<?php
namespace App\Service;
use App\Entity\Address;
use App\Entity\Users;
use App\GraphQL\Input\CreateAddressInput;
use App\Repository\AddressRepository;
use App\Repository\UsersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use Doctrine\Common\Persistence\ObjectManager;

class AddressService extends AbstractController
{
    private $userId;

    private $addressId;

    private $data;

    private $session_key;
    /**
     * @var UsersRepository
     */
    private $usersRepository;
    /**
     * @var AddressRepository
     */
    private $addressRepository;

    public function __construct(
        EntityManager $em,
        ObjectManager $manager,
        UsersRepository $usersRepository,
        AddressRepository $addressRepository
    ) {
        $this->em = $em;
        $this->manager = $manager;
        $this->usersRepository = $usersRepository;
        $this->addressRepository = $addressRepository;
    }

    public function setUserId(string $userId)
    {
        $this->userId = $userId;
        return $this;
    }

    public function getUserId()
    {
        return $this->userId;
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setAddressId(int $addressId)
    {
        $this->addressId = $addressId;
        return $this;
    }

    public function getAddressId()
    {
        return $this->addressId;
    }

    /**
     * @return mixed
     */
    public function getSessionKey()
    {
        return $this->session_key;
    }

    /**
     * @param mixed $session_key
     */
    public function setSessionKey($session_key)
    {
        $this->session_key = $session_key;
    }

    public function create()
    {
        $address = new Address();
        foreach(get_object_vars($this->getData()) as $attribute => $value) {
            if($value) {
                $address->setData($attribute, $value);
            }
        }
        if($this->getUserId()) {
            $user = $this->usersRepository->find($this->getUserId());

            if($user) {
                $address->setUserId($user);
            }
        } else {
            $address->setSessionKey($this->getSessionKey());
        }

        $this->manager->persist($address);
        $this->manager->flush();

        return $address;
    }

    public function update()
    {
        $address = $this->addressRepository->find($this->getAddressId());
        foreach(get_object_vars($this->getData()) as $attribute => $value) {
            if($value) {
                $address->setData($attribute, $value);
            }
        }
        $this->manager->flush();
        return $address;
    }

    public function remove()
    {
        $address = $this->addressRepository->find($this->getAddressId());

        $this->manager->remove($address);
        $this->manager->flush();

        return $address;
    }
}