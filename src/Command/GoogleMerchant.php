<?php
namespace App\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Command\Command;
use Vitalybaev\GoogleMerchant\Feed;
use Vitalybaev\GoogleMerchant\Product;
use Vitalybaev\GoogleMerchant\Product\Availability\Availability;
use App\Repository\ProductRepository;

class GoogleMerchant extends Command
{
    protected static $defaultName = 'gm:generate';
    /**
     * @var ProductRepository
     */
    private $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription('Google Merchant XML Generation')
            ->setHelp('');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $feed = new Feed("Brillenhof.com", "https://brillenhof.com", "Купить очки с доставкой оптика в Москве");

        foreach ($this->productRepository->findAll() as $product) {
            $item = new Product();

            $item->setId($product->getId());
            $item->setTitle('87asdf78as87df');
            $item->setDescription("adsf");
            $item->setImage("https://www.ochkov.net/images/2019/06/21/132887.product.259.jpg");
//            if ($product->isAvailable()) {
                $item->setAvailability(Availability::IN_STOCK);
//            } else {
//                $item->setAvailability(Availability::OUT_OF_STOCK);
//            }
            $item->setPrice("123 USD");
            $item->setGoogleCategory("Красота и здоровье > Личная гигиена > Средства для ухода за зрением > Контактные линзы");
            $item->setBrand('ACUVUE');
            $item->setGtin('00733905562846');
            $item->setCondition('new');

            // Some additional properties

            $feed->addProduct($item);
        }

        $feedXml = $feed->build();
        var_dump($feedXml);
        die();
        $output->writeln(['Successfully generated']);
    }
}