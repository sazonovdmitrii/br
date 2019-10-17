<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class StoreResolver extends LocaleAlias
{
    private $em;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * @return mixed
     */
    public function resolve(Argument $args)
    {
        $storeUrl = $this->em
            ->getRepository('App:StoreUrl')
            ->findByUrl($args['slug'] . '/');

        if($storeUrl) {
            $store = $storeUrl->getEntity();
            $store->setCurrentLocale($this->getLocale());
            return $store;
        }

        return [];
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Store'
        ];
    }
}