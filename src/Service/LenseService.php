<?php
namespace App\Service;

use App\Entity\LenseTag;
use App\Entity\Lense;
use App\Repository\LenseRepository;
use App\Repository\LenseTagRepository;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LenseService extends AbstractController
{
    protected $entityManager;

    protected $cache;

    private $formattedResult = [
        'recipes' => [
            'left' => [

            ],
            'right' => [

            ]
        ],
        'lenses' => [
            'name' => '',
            'options' => [

            ]
        ]
    ];
    /**
     * @var LenseTagRepository
     */
    private $lenseTagRepository;
    /**
     * @var LenseRepository
     */
    private $lenseRepository;

    public function __construct(
        EntityManager $entityManager,
        \Symfony\Component\Cache\Adapter\AdapterInterface $cache,
        LenseTagRepository $lenseTagRepository,
        LenseRepository $lenseRepository
    ) {
        $this->entityManager = $entityManager;
        $this->cache = $cache;
        $this->lenseTagRepository = $lenseTagRepository;
        $this->lenseRepository = $lenseRepository;
    }

    public function parse($lenses = '')
    {
        if(!$lenses) {
            return [];
        }
//        $lenses = '{"recipes":{"left":{"7":"4.25","8":"23","9":"90","10":"35.5"},"right":{"7":"-3.25","8":"13","9":"10","10":"25.5"}},"lenses":2}';
        $cacheItem = $this->cache->getItem('lenses_' . md5($lenses));
        if($cacheItem->isHit()) {
            return $cacheItem->get();
        }
        $lenses = json_decode(str_replace('\'', '"', $lenses), true);

        foreach(['left', 'right'] as $side) {

            foreach($lenses['recipes'][$side] as $recipeId => $recipeValue) {

                if($recipe = $this->getLenseTagById($recipeId)) {
                    $this->formattedResult['recipes'][$side][] = [
                        'name' => $recipe->getName(),
                        'value' => $recipeValue
                    ];
                }

            }

        }

        $options = [];
        if($lense = $this->getLenseById($lenses['lenses'])) {

            $this->formattedResult['lenses']['name'] = $lense->getName();
            $this->formattedResult['lenses']['price'] = $lense->getPrice();

            foreach($lense->getLenseitemstags() as $lenseItemTag) {

                $options[] = [
                    'name' => $lenseItemTag->getEntity()->getName(),
                    'value' => $lenseItemTag->getName()
                ];

            }

        }

        $this->formattedResult['lenses']['options'] = $options;

        $cacheItem->set($this->formattedResult);
        $this->cache->save($cacheItem);

        return $this->formattedResult;
    }

    /**
     * @param $lenseTagId
     * @return mixed
     */
    private function getLenseTagById($lenseTagId)
    {
        return $this->lenseTagRepository->find($lenseTagId);
    }

    /**
     * @param $lenseId
     * @return mixed
     */
    private function getLenseById($lenseId)
    {
        return $this->lenseRepository->find($lenseId);
    }
}