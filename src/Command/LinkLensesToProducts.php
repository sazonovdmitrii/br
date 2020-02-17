<?php
namespace App\Command;

use App\Repository\LenseRepository;
use App\Repository\ProductRepository;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Command\Command;
use Doctrine\ORM\EntityManager;

class LinkLensesToProducts extends Command
{
    protected static $defaultName = 'products:linklenses';
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var EntityManager
     */
    private $entityManager;
    /**
     * @var LenseRepository
     */
    private $lenseRepository;

    protected function configure()
    {
        $this
            ->setDescription('Link Lenses To Products')
            ->setHelp('');
    }

    public function __construct(
        ProductRepository $productRepository,
        EntityManager $entityManager,
        LenseRepository $lenseRepository
    ) {
        $this->productRepository = $productRepository;
        $this->entityManager = $entityManager;
        $this->lenseRepository = $lenseRepository;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $lenses = $this->lenseRepository->findAll();

        foreach($this->productRepository->findAll() as $product) {
            foreach($lenses as $lense) {
                $product->addLense($lense);
            }

            $this->entityManager->persist($product);
        }
        
        $this->entityManager->flush();

        $output->writeln(['Link has done']);
    }
}