<?php
namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Page;
use Doctrine\ORM\EntityManager;

class PageService extends AbstractController
{
    protected $page;
    protected $entityManager;

    public function __construct(
        EntityManager $entityManager
    ) {
        $this->entityManager = $entityManager;
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
            $pageUrl = $this->entityManager
                ->getRepository('App:PageUrl')
                ->find($urlsId);
            $page->addPageUrl($pageUrl);
        }
        $this->entityManager->persist($page);
        $this->entityManager->flush();
    }
}