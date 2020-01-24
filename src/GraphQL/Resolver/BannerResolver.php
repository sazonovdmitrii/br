<?php
namespace App\GraphQL\Resolver;

use App\Repository\BannerRepository;
use App\Repository\ImageTypeRepository;
use App\Service\Image\GeneratorService;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

/**
 * Class BannerResolver
 *
 * @package App\GraphQL\Resolver
 */
class BannerResolver extends LocaleAlias implements ResolverInterface, AliasedInterface
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @var BannerRepository
     */
    private $bannerRepository;

    /**
     * @var ImageTypeRepository
     */
    private $imageTypeRepository;

    /**
     * @var GeneratorService
     */
    private $imageGenerator;

    /**
     * BannerResolver constructor.
     *
     * @param EntityManager $entityManager
     * @param BannerRepository $bannerRepository
     * @param ImageTypeRepository $imageTypeRepository
     * @param GeneratorService $imageGenerator
     */
    public function __construct(
        EntityManager $entityManager,
        BannerRepository $bannerRepository,
        ImageTypeRepository $imageTypeRepository,
        GeneratorService $imageGenerator
    ) {
        $this->em = $entityManager;
        $this->bannerRepository = $bannerRepository;
        $this->imageTypeRepository = $imageTypeRepository;
        $this->imageGenerator = $imageGenerator;
    }

    /**
     * @return array
     */
    public function resolve()
    {
        $banners = $this->bannerRepository->findCurrents();

        $imageConfiguration = $this->imageTypeRepository->findAll();

        foreach($banners as $banner) {

            $banner->setCurrentLocale($this->getLocale());

            $images = [];
            foreach($banner->getBannerItems() as $bannerItem) {
                $images[] = $this->imageGenerator
                    ->setImage($bannerItem)
                    ->setTypes(['original', 'webp'])
                    ->setConfig($imageConfiguration)
                    ->getAll();
                if(count($images)) {
                    $bannerItem->setImages($images[0]);
                }
            }
        }

        return [
            'data' => $banners
        ];
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Banner'
        ];
    }
}