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

    /**
     * ConfigService constructor.
     *
     * @param EntityManager $entityManager
     * @param ConfigurationRepository $configurationRepository
     */
    public function __construct(
        EntityManager $entityManager,
        ConfigurationRepository $configurationRepository
    ) {
        $this->entityManager = $entityManager;
        $this->configurationRepository = $configurationRepository;
    }

    /**
     * @param $option
     * @return string|null
     */
    public function get($option)
    {
        $option = $this->configurationRepository->findOneBy(['option' => $option]);
        if($option) {
            return $option->getValue();
        }
    }

    /**
     * @param $param
     * @return mixed
     */
    public function getServiceConfig($param)
    {
        return $this->getParameter($param);
    }
}