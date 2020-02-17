<?php
namespace App\GraphQL\Resolver;

use App\Repository\StoreUrlRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class StoreResolver extends LocaleAlias
{
    private $em;
    /**
     * @var StoreUrlRepository
     */
    private $storeUrlRepository;

    /**
     * StoreResolver constructor.
     *
     * @param EntityManager $em
     * @param StoreUrlRepository $storeUrlRepository
     */
    public function __construct(
        EntityManager $em,
        StoreUrlRepository $storeUrlRepository
    ) {
        $this->em = $em;
        $this->storeUrlRepository = $storeUrlRepository;
    }

    /**
     * @return mixed
     */
    public function resolve(Argument $args)
    {
        $storeUrl = $this->storeUrlRepository->findByUrl($args['slug'] . '/');

        if($storeUrl) {
            $store = $storeUrl->getEntity();
            $store->setCurrentLocale($args['locale']);
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