<?php
namespace App\Service;
use App\Entity\ProductTagItem;
use App\Repository\ProductTagItemRepository;
use App\Repository\ProductTagRepository;
use Overblog\GraphQLBundle\Definition\Argument;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use App\Entity\ProductTag;
use App\Service\ConfigService;

class UrlParseService extends AbstractController
{
    private $em;
    /**
     * @var ProductTagItemRepository
     */
    private $productTagItemRepository;
    /**
     * @var ProductTagRepository
     */
    private $productTagRepository;

    public function __construct(
        EntityManager $em,
        ConfigService $configService,
        ProductTagRepository $productTagRepository,
        ProductTagItemRepository $productTagItemRepository
    ) {
        $this->em = $em;
        $this->configService = $configService;
        $this->productTagItemRepository = $productTagItemRepository;
        $this->productTagRepository = $productTagRepository;
    }

    function parse(Argument $args)
    {
        $url = isset($args['slug']) ? $args['slug'] : '';
        $urlComponents = explode('/', $url);
        $tagsLib = [
            'path' => $url,
            'filters' => []
        ];
        foreach($urlComponents as $urlComponent) {
            $filterComponents = explode('_', $urlComponent);
            $tag = $value = false;

            if(count($filterComponents) > 1) {
                $tag = $this->productTagRepository->findBySlug($filterComponents[0]);
                if($tag) {
                    $value = $this->productTagItemRepository->findBySlug($filterComponents[1]);
                }
            } else {
                if($urlComponent) {

                    $stopTags = $this->configService
                        ->get('stop_tag');

                    if($stopTags) {
                        $stopTags = explode(',', $stopTags);
                    }
                    if(!$stopTags) {
                        $stopTags = [];
                    }

                    $pathExists = false;
                    foreach (explode('-', $urlComponent) as $urlTagPart) {
                        if(in_array($urlTagPart, $stopTags)) {
                            continue;
                        }
                        $value = $this->productTagItemRepository->findBySlug($urlTagPart);
                        if($value) {
                            $pathExists = true;
                            $tagsLib['filters'][] = $this->_getTag($value->getId());
                        }
                    }

                    $tagsLib['path'] = $urlComponent;
                }
            }

            if($tag && $value) {
                $tagsLib['filters'][] = [
                    'tag' => $tag,
                    'value' => $value
                ];
            }
        }

        if(isset($args['tags'])) {
            foreach($args['tags'] as $filterTagId) {
                if($tag = $this->_getTag($filterTagId)) {
                    $tagsLib['filters'][] = $tag;
                }
            }
        }

        return $tagsLib;
    }

    private function _getTag($tagId)
    {
        $value = $this->productTagItemRepository->find($tagId);
        if($value) {
            $tag = $value->getEntityId();
             return [
                'tag' => $tag,
                'value' => $value
            ];
        }
    }
}