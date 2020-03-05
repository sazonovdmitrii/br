<?php

namespace App\Lp\PaymentBundle\Controller;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class YandexController extends AbstractController
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function index()
    {
        $this->logger->debug('Request: ' . json_encode($_REQUEST));
        die('.');
    }
}
