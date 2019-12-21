<?php
namespace App\Service\Twig;
use App\Entity\LenseItemTag;
use App\Entity\LenseTag;
use App\Entity\ProductItemTag;
use App\Entity\ProductTag;
use App\Repository\ProductItemTagRepository;
use App\Repository\ProductTagRepository;
use Doctrine\ORM\EntityManager;

class Tags
{
    private $em;
    /**
     * @var ProductTagRepository
     */
    private $productTagRepository;
    /**
     * @var ProductItemTagRepository
     */
    private $productItemTagRepository;

    public function __construct(
        EntityManager $entityManager,
        ProductTagRepository $productTagRepository,
        ProductItemTagRepository $productItemTagRepository
    ) {
        $this->em = $entityManager;
        $this->productTagRepository = $productTagRepository;
        $this->productItemTagRepository = $productItemTagRepository;
    }

    public function getTree()
    {
        return $this->productTagRepository->findAll();
    }

    public function getItemTree()
    {
        return $this->productItemTagRepository->findAll();
    }
}