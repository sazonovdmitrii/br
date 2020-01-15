<?php
namespace App\Command;

use App\Service\ConfigService;
use App\Service\EnvService;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Command\Command;
use Vitalybaev\GoogleMerchant\Feed;
use Vitalybaev\GoogleMerchant\Product;
use App\Repository\ProductRepository;
use App\Validator\GoogleMerchantProduct;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Command\FeedData\FeedFactory;

class GoogleMerchant extends Command
{
    protected static $defaultName = 'gm:generate';
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var ConfigService
     */
    private $configService;
    /**
     * @var ValidatorInterface
     */
    private $validator;

    private $product;

    private $productData;
    /**
     * @var EnvService
     */
    private $envService;

    private $type;

    const FEED_TYPES = ['gm', 'facebook'];

    public function __construct(
        ProductRepository $productRepository,
        ConfigService $configService,
        ValidatorInterface $validator,
        EnvService $envService
    ) {
        $this->productRepository = $productRepository;
        $this->configService = $configService;
        $this->validator = $validator;
        $this->envService = $envService;
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
    public function getProductData()
    {
        if($this->productData) {
            return $this->productData;
        }
        $feedFactory = new FeedFactory($this->getType(), $this->configService, $this->envService);

        $this->setProductData($feedFactory->getDataProvider()
            ->setProduct($this->product)
            ->getData());

        return $this->productData;
    }

    /**
     * @param $productData
     * @return $this
     */
    public function setProductData($productData)
    {
        $this->productData = $productData;
        return $this;
    }

    /**
     * @param $product
     * @return $this
     */
    public function setProduct($product)
    {
        $this->product = $product;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getProduct()
    {
        return $this->product;
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

            foreach ($this->productRepository->findAll() as $product) {

                $this->setProduct($product);

                $errors = $this->validator->validate($this->getProductData(), $gmValidator);

                if(!$errors->count()) {
                    $product = new Product();

                    foreach($this->getProductData() as $attribute => $value) {
                        $product->setAttribute($attribute, $value);
                    }

                    $feed->addProduct($product);

                } else {
                    $output->writeln((string)$errors);
                }

                $this->setProductData([]);
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