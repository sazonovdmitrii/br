<?php
namespace App\GraphQL\Resolver;

use App\Repository\PageUrlRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class PageResolver extends LocaleAlias {

    private $em;
    /**
     * @var PageUrlRepository
     */
    private $pageUrlRepository;

    /**
     * PageResolver constructor.
     *
     * @param EntityManager $em
     * @param PageUrlRepository $pageUrlRepository
     */
    public function __construct(
        EntityManager $em,
        PageUrlRepository $pageUrlRepository
    ) {
        $this->em = $em;
        $this->pageUrlRepository = $pageUrlRepository;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $pageUrl = $this->pageUrlRepository->findByUrl($args['slug'] . '/');

        if($pageUrl) {
            $page = $pageUrl->getEntity();
            $page->setCurrentLocale($args['locale']);
            return $page;
        }

        return [];
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Page'
        ];
    }
}