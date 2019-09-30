<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class BlockResolver extends LocaleAlias {

    private $em;

    /**
     * PageResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $block = $this->em
            ->getRepository('App:Block')
            ->findByName($args['id']);
        if(!$block) {
            return [];
        }
        $block->setCurrentLocale($this->getLocale());
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