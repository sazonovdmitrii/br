<?php
namespace App\Service;

use App\Repository\PageUrlRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Page;
use Doctrine\ORM\EntityManager;

class PageService extends AbstractController
{
    protected $page;
    protected $entityManager;
    /**
     * @var PageUrlRepository
     */
    private $pageUrlRepository;

    public function __construct(
        EntityManager $entityManager,
        PageUrlRepository $pageUrlRepository
    ) {
        $this->entityManager = $entityManager;
        $this->pageUrlRepository = $pageUrlRepository;
    }

    public function setPage(Page $page)
    {
        $this->page = $page;
        return $this;
    }

    public function getPage()
    {
        return $this->page;
    }

    public function updatePageUrls(array $urlsIds)
    {
        $page = $this->getPage();
        foreach($urlsIds as $urlsId) {
            $pageUrl = $this->pageUrlRepository->find($urlsId);
            $page->addPageUrl($pageUrl);
        }
        $this->entityManager->persist($page);
        $this->entityManager->flush();
    }
}