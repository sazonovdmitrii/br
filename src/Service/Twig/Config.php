<?php
namespace App\Service\Twig;
use App\Service\ConfigService;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class Config extends AbstractController
{
    private $entityManager;

    private $configService;

    public function __construct(
        EntityManager $entityManager,
        ConfigService $configService
    ) {
        $this->entityManager = $entityManager;
        $this->configService = $configService;
    }

    function get($path)
    {
        return $this->getParameter($path);
    }

    public function getParam($option)
    {
        return $this->configService->get($option);
    }

    public function getServiceConfig($param)
    {
        return $this->getParameter($param);
    }

    public function parseKeyValue($array)
    {
        $result = [];
        foreach($array as $item) {
            $result[$item['key']] = $item['value'];
        }
        return $result;
    }
}