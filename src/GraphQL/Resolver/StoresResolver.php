<?php
namespace App\GraphQL\Resolver;

use App\Repository\StoreRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class StoresResolver extends LocaleAlias
{
    private $em;
    /**
     * @var StoreRepository
     */
    private $storeRepository;

    const URL_SUFFIX = 'retail';

    /**
     * StoresResolver constructor.
     *
     * @param EntityManager $em
     * @param StoreRepository $storeRepository
     */
    public function __construct(
        EntityManager $em,
        StoreRepository $storeRepository
    ) {
        $this->em = $em;
        $this->storeRepository = $storeRepository;
    }

    /**
     * @return mixed
     */
    public function resolve($args)
    {
        $stores = $this->storeRepository
            ->setCheckVision((isset($args['check_vision'])) ? $args['check_vision'] : 0)
            ->findAll();

        foreach($stores as $store) {
            $store->setCurrentLocale($args['locale']);
        }

        return [
            'data' => $this->_retailAddresses($stores)
        ];
    }

    private function _retailAddresses(&$stores)
    {
        foreach($stores as &$store) {
            foreach($store->getStoreUrls() as $storeUrl) {
                $storeUrl->setUrl(self::URL_SUFFIX . '/' . $storeUrl->getUrl());
            }
        }
        return $stores;
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