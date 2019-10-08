<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class StoresResolver extends LocaleAlias
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
    public function resolve()
    {
        $stores = $this->em->getRepository('App:Store')
            ->findAll();

        foreach($stores as $store) {
            $store->setCurrentLocale($this->getLocale());
        }

        return [
            'data' => $stores
        ];
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Stores'
        ];
    }
}