<?php

namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use App\Entity\Lense;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;
use Overblog\GraphQLBundle\Relay\Connection\Output\Connection;
use App\Service\Twig\LenseTags;

class LenseFieldResolver extends LocaleAlias
{
    private $lenseTagService;

    /**
     * LenseFieldResolver constructor.
     *
     * @param LenseTags $lenseTags
     */
    public function __construct(LenseTags $lenseTags)
    {
        $this->lenseTagService = $lenseTags;
    }

    /**
     * @param ResolveInfo $info
     * @param $value
     * @param Argument $args
     * @return mixed
     */
    public function __invoke(ResolveInfo $info, $value, Argument $args)
    {
        $method = $info->fieldName;
        return $this->$method($value, $args);
    }

    /**
     * @param Lense $lense
     * @return mixed
     */
    public function name(Lense $lense)
    {
        return $lense->getName();
    }

    /**
     * @param Lense $lense
     * @return mixed
     */
    public function price(Lense $lense)
    {
        return $lense->getPrice();
    }

    public function lenseitemstags(Lense $lense)
    {
        return $lense->getLenseitemstags();
    }

    public function recipes(Lense $lense)
    {
//        return $lense->getRecipes();
        return $this->lenseTagService->getLenseTagsItemsTree('receipt');
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'LenseField'
        ];
    }
}