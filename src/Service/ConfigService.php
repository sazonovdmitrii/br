<?php
namespace App\Service;
use App\Repository\ConfigurationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use App\Entity\Configuration;

class ConfigService extends AbstractController
{
    private $entityManager;
    /**
     * @var ConfigurationRepository
     */
    private $configurationRepository;

    public function __construct(
        EntityManager $entityManager,
        ConfigurationRepository $configurationRepository
    ) {
        $this->entityManager = $entityManager;
        $this->configurationRepository = $configurationRepository;
    }

    public function get($option)
    {
        $option = $this->configurationRepository->findOneBy(['option' => $option]);
        if($option) {
            return $option->getValue();
        }
    }

    public function getServiceConfig($param)
    {
        return $this->getParameter($param);
    }
}