<?php
namespace App\GraphQL\Resolver;

use App\Repository\ImageTypeRepository;
use App\Repository\OrdersRepository;
use App\Service\Image\GeneratorService;
use App\Service\InfoService;
use App\Service\LenseService;
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
     * @var InfoService
     */
    private $infoService;
    /**
     * @var LenseService
     */
    private $lenseService;
    /**
     * @var ImageTypeRepository
     */
    private $imageTypeRepository;
    /**
     * @var GeneratorService
     */
    private $generatorService;

    /**
     * OrderResolver constructor.
     *
     * @param EntityManager $em
     * @param OrdersRepository $ordersRepository
     */
    public function __construct(
        EntityManager $em,
        OrdersRepository $ordersRepository,
        InfoService $infoService,
        LenseService $lenseService,
        ImageTypeRepository $imageTypeRepository,
        GeneratorService $generatorService
    ) {
        $this->em = $em;
        $this->ordersRepository = $ordersRepository;
        $this->infoService = $infoService;
        $this->lenseService = $lenseService;
        $this->imageTypeRepository = $imageTypeRepository;
        $this->generatorService = $generatorService;
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

        $infoService = $this->infoService->setLocale($args['locale']);

        $order->setPayment($infoService->getPaymentInfo($order));
        $order->setDelivery($infoService->getDeliveryInfo($order));

        foreach($order->getOrderItems() as $orderItem) {

            $images = [];

            $config = $this->imageTypeRepository->findAll();

            $item = $orderItem->getItem();

            foreach ($item->getProductItemImages() as $image) {

                $images[] = $this->generatorService
                    ->setImage($image)
                    ->setTypes(['original', 'webp'])
                    ->setConfig($config)
                    ->getAll();

            }

            $item->setImages($images);
            $orderItem->setItem($item);

            $orderItem->setLense(
                json_decode(str_replace('\'', '"', $orderItem->getLenses()), true)
            );
        }

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