<?php
namespace App\Service;
use App\Repository\UsersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use App\Service\Order;

class OrderService extends AbstractController
{
    private $userId;
    /**
     * @var UsersRepository
     */
    private $usersRepository;

    public function __construct(
        EntityManager $em,
        UsersRepository $usersRepository
    ) {
        $this->em = $em;
        $this->usersRepository = $usersRepository;
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

    public function getOrders()
    {
        $user = $this->usersRepository->find($this->getUserId());
        return $user->getOrders();
    }
}