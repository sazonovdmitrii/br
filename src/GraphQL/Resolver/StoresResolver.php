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