<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class PageResolver extends LocaleAlias {

    private $em;

    /**
     * PageResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $pageUrl = $this->em
            ->getRepository('App:PageUrl')
            ->findByUrl($args['slug'] . '/');

        if($pageUrl) {
            $page = $pageUrl->getEntity();
            $page->setCurrentLocale($this->getLocale());
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