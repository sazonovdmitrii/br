<?php
namespace App\Command;

use App\Repository\ProductItemRepository;
use App\Service\ConfigService;
use App\Service\EnvService;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Command\Command;
use Vitalybaev\GoogleMerchant\Feed;
use Vitalybaev\GoogleMerchant\Product;
use App\Validator\GoogleMerchantProduct;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Command\FeedData\FeedFactory;

/**
 * Class GoogleMerchant
 *
 * @package App\Command
 */
class GoogleMerchant extends Command
{
    protected static $defaultName = 'gm:generate';

    /**
     * @var ProductItemRepository
     */
    private $productItemRepository;

    /**
     * @var ConfigService
     */
    private $configService;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * @var
     */
    private $item;

    /**
     * @var
     */
    private $itemData;

    /**
     * @var EnvService
     */
    private $envService;

    /**
     * @var
     */
    private $type;

    const FEED_TYPES = ['gm', 'facebook'];

    /**
     * GoogleMerchant constructor.
     *
     * @param ConfigService $configService
     * @param ValidatorInterface $validator
     * @param EnvService $envService
     * @param ProductItemRepository $productItemRepository
     */
    public function __construct(
        ConfigService $configService,
        ValidatorInterface $validator,
        EnvService $envService,
        ProductItemRepository $productItemRepository
    ) {
        $this->configService = $configService;
        $this->validator = $validator;
        $this->envService = $envService;
        $this->productItemRepository = $productItemRepository;
        parent::__construct();
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param $type
     * @return $this
     */
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getItemData()
    {
        if($this->itemData) {
            return $this->itemData;
        }
        $feedFactory = new FeedFactory($this->getType(), $this->configService, $this->envService);

        $this->setItemData($feedFactory->getDataProvider()
            ->setItem($this->item)
            ->getData());

        return $this->itemData;
    }

    /**
     * @param $itemData
     * @return $this
     */
    public function setItemData($itemData)
    {
        $this->itemData = $itemData;
        return $this;
    }

    /**
     * @param $item
     * @return $this
     */
    public function setItem($item)
    {
        $this->item = $item;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getItem()
    {
        return $this->item;
    }

    protected function configure()
    {
        $this->setDescription('Google Merchant XML Generation')
            ->setHelp('');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        foreach(self::FEED_TYPES as $type) {

            $this->setType($type);

            $feed = new Feed(
                $this->configService->get('gm_name'),
                $this->envService->getDomain(),
                $this->configService->get('gm_description')
            );

            $gmValidator = new GoogleMerchantProduct();

            foreach ($this->productItemRepository->findAll() as $item) {

                $this->setItem($item);
                $errors = $this->validator->validate($this->getItemData(), $gmValidator);

                if(!$errors->count()) {
                    $product = new Product();

                    foreach($this->getItemData() as $attribute => $value) {
                        $product->setAttribute($attribute, $value);
                    }

                    $feed->addProduct($product);

                } else {
                    $output->writeln((string)$errors);
                }

                $this->setItemData([]);
            }

            $feedXml = $feed->build();
            
            $this->writeData($this->envService->getBasePath('public') . '/' . $type . '.xml', $feedXml);
        }


        $output->writeln(['Successfully generated']);
    }

    private function writeData($filename, $xml)
    {
        return file_put_contents($filename, $xml);
    }
}