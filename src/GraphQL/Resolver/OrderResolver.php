<?php
namespace App\GraphQL\Resolver;

use App\Repository\OrdersRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use GraphQL\Error\UserError;

class OrderResolver extends LocaleAlias
{
    private $em;
    /**
     * @var OrdersRepository
     */
    private $ordersRepository;

    /**
     * OrderResolver constructor.
     *
     * @param EntityManager $em
     * @param OrdersRepository $ordersRepository
     */
    public function __construct(
        EntityManager $em,
        OrdersRepository $ordersRepository
    ) {
        $this->em = $em;
        $this->ordersRepository = $ordersRepository;
    }

    /**
     * @return mixed
     */
    public function resolve(Argument $args)
    {
        if(!$args['secret_key']) {
            throw new UserError('Ошибка! Необходим идентификатор заказа.');
        }

        $order = $this->ordersRepository->findBySecretKey($args['secret_key']);

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