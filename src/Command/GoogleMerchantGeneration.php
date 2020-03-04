<?php
namespace App\Command;

use App\Repository\ProductItemRepository;
use App\Service\ConfigService;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Command\Command;
use Doctrine\ORM\EntityManager;

class GoogleMerchantGeneration extends Command
{
    protected static $defaultName = 'gm:generate-data';
    /**
     * @var ProductItemRepository
     */
    private $productItemRepository;
    /**
     * @var ConfigService
     */
    private $configService;
    /**
     * @var EntityManager
     */
    private $entityManager;

    const LOCALE_CONFIG = 'a2lix_translation_form.locales';

    public function __construct(
        $name = null,
        ProductItemRepository $productItemRepository,
        ConfigService $configService,
        EntityManager $entityManager
    ) {
        parent::__construct($name);
        $this->productItemRepository = $productItemRepository;
        $this->configService = $configService;
        $this->entityManager = $entityManager;
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        foreach($this->productItemRepository->findAll() as $productItem) {
            if($productItem->getProduct()) {
                foreach($this->configService->getServiceConfig(self::LOCALE_CONFIG) as $locale) {
                    $replace = [
                        '[product_name]' => $productItem->getProduct()->getName(),
                        '[item_name]'    => $productItem->getName()
                    ];
                    $productItem->setCurrentLocale($locale);
                    $productItem->setGoogleTitle(
                        trim(strtr($this->configService->get('gm_title_mask'), $replace))
                    );
                    $productItem->setGoogleDescription(
                        trim(strtr($this->configService->get('gm_description_mask'), $replace))
                    );
                }
                $productItem->mergeNewTranslations();
                $this->entityManager->persist($productItem);
            }
        }
        $this->entityManager->flush();

        $output->writeln(['Success']);
    }
}