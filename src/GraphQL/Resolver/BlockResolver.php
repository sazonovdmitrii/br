<?php
namespace App\GraphQL\Resolver;

use App\Repository\BlockRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class BlockResolver extends LocaleAlias {

    private $em;
    /**
     * @var BlockRepository
     */
    private $blockRepository;

    /**
     * BlockResolver constructor.
     *
     * @param EntityManager $em
     * @param BlockRepository $blockRepository
     */
    public function __construct(
        EntityManager $em,
        BlockRepository $blockRepository
    ) {
        $this->em = $em;
        $this->blockRepository = $blockRepository;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $block = $this->blockRepository->findByName($args['id']);

        if(!$block) {
            return [];
        }

        $block->setCurrentLocale($args['locale']);
        return $block;
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Block'
        ];
    }
}