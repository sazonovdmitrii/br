<?php
namespace App\Service;

use App\Entity\LenseItemTag;
use App\Repository\CatalogRepository;
use App\Repository\LenseItemTagRepository;
use App\Repository\ProductItemTagItemRepository;
use App\Repository\ProductRepository;
use App\Repository\ProductTagItemRepository;
use App\Repository\ProductTagRepository;
use Doctrine\ORM\EntityManager;
use Redis;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Common\Persistence\ObjectManager;

class AdminTagService extends TagService
{
    private $redis;

    private $doctrineService;

    /**
     * @var ProductTagItemRepository
     */
    private $productTagItemRepository;
    /**
     * @var ProductTagRepository
     */
    private $productTagRepository;
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var CatalogRepository
     */
    private $catalogRepository;
    /**
     * @var ProductItemTagItemRepository
     */
    private $productItemTagItemRepository;
    /**
     * @var LenseItemTagRepository
     */
    private $lenseItemTagRepository;

    /**
     * AdminTagService constructor.
     *
     * @param Redis $redis
     * @param EntityManager $em
     * @param DoctrineService $doctrineService
     * @param ConfigService $configService
     * @param ObjectManager $manager
     * @param ProductTagItemRepository $productTagItemRepository
     * @param ProductTagRepository $productTagRepository
     * @param ProductRepository $productRepository
     * @param CatalogRepository $catalogRepository
     * @param ProductItemTagItemRepository $productItemTagItemRepository
     * @param LenseItemTagRepository $lenseItemTagRepository
     */
    public function __construct(
        Redis $redis,
        EntityManager $em,
        DoctrineService $doctrineService,
        ConfigService $configService,
        ObjectManager $manager,
        ProductTagItemRepository $productTagItemRepository,
        ProductTagRepository $productTagRepository,
        ProductRepository $productRepository,
        CatalogRepository $catalogRepository,
        ProductItemTagItemRepository $productItemTagItemRepository,
        LenseItemTagRepository $lenseItemTagRepository
    ) {
        $this->em              = $em;
        $this->redis           = $redis;
        $this->doctrineService = $doctrineService;
        $this->configService   = $configService;
        $this->manager         = $manager;
        $this->productTagItemRepository = $productTagItemRepository;
        $this->productTagRepository = $productTagRepository;
        $this->productRepository = $productRepository;
        $this->catalogRepository = $catalogRepository;
        parent::__construct($redis, $em, $doctrineService, $configService, $manager, $productTagItemRepository, $productTagRepository, $productRepository, $catalogRepository);
        $this->productItemTagItemRepository = $productItemTagItemRepository;
        $this->lenseItemTagRepository = $lenseItemTagRepository;
    }

    private $tags = [];

    public function getTags()
    {
        return $this->tags;
    }

    public function setTags($tags)
    {
        $this->tags = $tags;
        return $this;
    }

    public function parseRequest($request)
    {
        $result = [];
        foreach($request as $key => $value) {
            if(strpos($key, 'tag_') !== false) {
                $tagKey = str_replace('tag_', '', $key);
                if (is_array($value) && count($value) && $value[0]) {
                    $result[$tagKey] = implode(',', $value);
                } elseif ($value) {
                    $result[$tagKey] = $value;
                }
            }
        }
        return $result;
    }

    public function update()
    {
        $method = 'update' . $this->getEntityType();
        return $this->$method();
    }

    public function updateProduct()
    {
        $manager = $this->getDoctrine()->getManager();

        foreach($this->getEntity()->getProducttagitem() as $productTagItem) {
            $this->getEntity()->removeProducttagitem($productTagItem);
        }

        foreach($this->getTags() as $tagId => $tagValue) {
            $tagValues = explode(',', $tagValue);
            foreach($tagValues as $tagValue) {
                $productTagItem = $this->productTagItemRepository->find($tagValue);
                $this->getEntity()->addProducttagitem($productTagItem);
                $manager->persist($this->getEntity());
                $manager->flush();
            }
        }
    }

    public function updateProductItem()
    {
        $this->productItemTagItemRepository->flushByProductItem($this->getEntity());

        $manager = $this->getDoctrine()->getManager();

        $entity = $this->getEntity();

        foreach($this->getTags() as $tagId => $tagValue) {
            $tagValues = explode(',', $tagValue);
            foreach($tagValues as $tagValue) {
                $productTagItem = $this->productItemTagItemRepository->find($tagValue);
                $entity->addProductItemTagItem($productTagItem);

                $manager->persist($entity);
                $manager->flush();
            }
        }
    }

    public function updateCatalog()
    {
        $manager = $this->getDoctrine()->getManager();

        foreach($this->getEntity()->getProductTagItems() as $productTagItem) {
            $this->getEntity()->removeProductTagItem($productTagItem);
        }

        foreach($this->getTags() as $tagId => $tagValue) {
            $productTagItem = $this->productTagItemRepository->find($tagValue);
            $this->getEntity()->addProductTagItem($productTagItem);
            $manager->persist($this->getEntity());
            $manager->flush();
        }
    }

    public function updateLense()
    {
        $manager = $this->getDoctrine()->getManager();

        foreach($this->getEntity()->getLenseitemstags() as $lenseItemTag) {
            $this->getEntity()->removeLenseitemstag($lenseItemTag);
        }

        foreach($this->getTags() as $tagId => $tagValue) {
            $lenseItemTag= $this->lenseItemTagRepository->find($tagValue);
            $this->getEntity()->addLenseitemstag($lenseItemTag);
            $manager->persist($this->getEntity());
            $manager->flush();
        }
    }
}