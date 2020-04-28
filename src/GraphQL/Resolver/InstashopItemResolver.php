<?php
namespace App\GraphQL\Resolver;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;

/**
 * Class InstashopItemResolver
 *
 * @package App\GraphQL\Resolver
 */
class InstashopItemResolver extends LocaleAlias
{
    /**
     * @param array $data
     * @param Argument $args
     * @return mixed
     */
    public function resolve(array $data, Argument $args)
    {
        $data = $data['data'];
        $paginator = new Paginator(function () use ($data, $args) {
            return array_slice($data, $args['offset'], $args['limit'] ?? 10);
        });
        return $paginator->auto($args, count($data));
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'InstashopItem'
        ];
    }
}