<?php
namespace App\GraphQL\Resolver;

use App\Repository\BannerRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class BannerResolver implements ResolverInterface, AliasedInterface
{
    private $em;
    /**
     * @var BannerRepository
     */
    private $bannerRepository;

    public function __construct(
        EntityManager $entityManager,
        BannerRepository $bannerRepository
    ) {
        $this->em = $entityManager;
        $this->bannerRepository = $bannerRepository;
    }

    public function resolve()
    {
        $banners = $this->bannerRepository->findAll();
        return [
            'data' => $banners
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Banner'
        ];
    }
}