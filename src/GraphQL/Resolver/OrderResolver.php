<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;

class OrderResolver extends LocaleAlias
{
    private $em;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * @return mixed
     */
    public function resolve(Argument $args)
    {
        if(!$args['secret_key']) {
            throw new UserError('Ошибка! Необходим идентификатор заказа.');
        }

        $order = $this->em
            ->getRepository('App:Orders')
            ->findBySecretKey($args['secret_key']);

        if(!$order) {
            throw new UserError('Ошибка! Заказ не найден.');
        }

        return $order;
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Order'
        ];
    }
}