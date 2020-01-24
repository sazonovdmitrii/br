<?php
namespace App\Service\Twig;

use App\Repository\BannerItemRepository;

class BannerItems
{
    /**
     * @var BannerItemRepository
     */
    private $bannerItemRepository;

    public function __construct(BannerItemRepository $bannerItemRepository)
    {
        $this->bannerItemRepository = $bannerItemRepository;
    }

    public function getAll()
    {
        return $this->bannerItemRepository->findAll();
    }
}