<?php
namespace App\Service;

use App\Repository\StoreUrlRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Store;
use Doctrine\ORM\EntityManager;

class StoreService extends AbstractController
{
    protected $store;
    protected $entityManager;
    /**
     * @var StoreUrlRepository
     */
    private $storeUrlRepository;

    public function __construct(
        EntityManager $entityManager,
        StoreUrlRepository $storeUrlRepository
    ) {
        $this->entityManager = $entityManager;
        $this->storeUrlRepository = $storeUrlRepository;
    }

    public function setStore(Store $store)
    {
        $this->store = $store;
        return $this;
    }

    public function getStore()
    {
        return $this->store;
    }

    public function updateStoreUrls(array $urlsIds)
    {
        $store = $this->getStore();
        foreach($urlsIds as $urlsId) {
            $storeUrl = $this->storeUrlRepository->find($urlsId);
            $store->addStoreUrl($storeUrl);
        }
        $this->entityManager->persist($store);
        $this->entityManager->flush();
    }
}