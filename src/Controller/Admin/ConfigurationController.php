<?php

namespace App\Controller\Admin;

use App\Entity\LenseItemTag;
use App\Repository\LenseItemTagRepository;
use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use App\Service\RequestFilterService;
use App\Service\DoctrineService;
use App\Entity\Configuration;
use App\Service\TagService;
use App\Repository\ConfigurationRepository;

class ConfigurationController extends BaseAdminController
{
    private $_template = 'admin/Configuration/form.html.twig';

    /**
     * @var RequestFilterService
     */
    private $filterService;

    /**
     * @var DoctrineService
     */
    private $doctrineService;

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var TagService
     */
    private $tagService;

    /**
     * @var ConfigurationRepository
     */
    private $configurationRepository;
    /**
     * @var LenseItemTagRepository
     */
    private $lenseItemTagRepository;

    public function __construct(
        RequestFilterService $filterService,
        DoctrineService $doctrineService,
        EntityManager $entityManager,
        TagService $tagService,
        ConfigurationRepository $configurationRepository,
        LenseItemTagRepository $lenseItemTagRepository
    ) {
        $this->filterService = $filterService;
        $this->doctrineService = $doctrineService;
        $this->entityManager = $entityManager;
        $this->tagService = $tagService;
        $this->configurationRepository = $configurationRepository;
        $this->lenseItemTagRepository = $lenseItemTagRepository;
    }

    protected function renderTemplate($actionName, $templatePath, array $parameters = array())
    {
        $list = $this->getDoctrine()->getRepository(Configuration::class)->findAll();
        foreach($list as $item) {
            $parameters['list'][$item->getOption()] = $item->getValue();
        }
        $parameters['tags'] = $this->tagService->all();
        $parameters['lenseItemTags'] = $this->lenseItemTagRepository->findAll();
        return $this->render($this->_template, $parameters);
    }

    public function saveAction()
    {
        $parameters = $this->filterService->filterQuery($this->request->query);
        $this->configurationRepository->flush();

        foreach($parameters as $option => $value) {
            $configuration = new Configuration();
            $configuration->setOption($option);
            $configuration->setValue($value);
            $this->entityManager->persist($configuration);
        }
        $this->entityManager->flush();
        $this->entityManager->clear();
        return $this->redirectToReferrer();
    }
}
