<?php
namespace App\GraphQL\Resolver;
use App\Repository\CatalogUrlRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use App\Service\UrlParseService;

class CatalogsResolver extends LocaleAlias {

    private $em;
    /**
     * @var CatalogUrlRepository
     */
    private $catalogUrlRepository;

    /**
     * CatalogsResolver constructor.
     *
     * @param EntityManager $em
     * @param UrlParseService $urlParseService
     * @param CatalogUrlRepository $catalogUrlRepository
     */
    public function __construct(
        EntityManager $em,
        UrlParseService $urlParseService,
        CatalogUrlRepository $catalogUrlRepository
    ) {
        $this->em = $em;
        $this->urlParseService = $urlParseService;
        $this->catalogUrlRepository = $catalogUrlRepository;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $parsed = $this->urlParseService->parse($args);

        if($parsed['path']) {
            $catalogUrl = $this->catalogUrlRepository->findByUrl($parsed['path'] . '/');
        }

        if($catalogUrl) {
            $catalog = $catalogUrl->getEntity();
            $catalog->setCurrentLocale($args['locale']);
            $catalog->setParsed($parsed);
            return $catalog;
        }

        return [];
    }
    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Catalogs'
        ];
    }
}