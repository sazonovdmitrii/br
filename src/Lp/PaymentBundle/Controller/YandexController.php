<?php

namespace App\Lp\PaymentBundle\Controller;

use App\Entity\Transaction;
use App\Repository\TransactionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;

/**
 * Class YandexController
 *
 * @package App\Lp\PaymentBundle\Controller
 */
class YandexController extends AbstractController
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var TransactionRepository
     */
    private $transactionRepository;

    /**
     * YandexController constructor.
     *
     * @param EntityManager $entityManager
     * @param TransactionRepository $transactionRepository
     */
    public function __construct(
        EntityManager $entityManager,
        TransactionRepository $transactionRepository
    ) {
        $this->entityManager = $entityManager;
        $this->transactionRepository = $transactionRepository;
    }

    public function index()
    {
        return $this->json(['success' => 200]);
    }

    public function success()
    {
        $transaction = new Transaction();

        $transaction->setType('yandex');
        $transaction->setData(json_encode($_REQUEST));

        $this->entityManager->persist($transaction);
        $this->entityManager->flush();

        return $this->json(['success' => 200]);
    }
}
