<?php
namespace App\Command;

use App\Repository\OrdersRepository;
use App\Service\ConfigService;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Command\Command;
use YandexCheckout\Client;

class Ya extends Command
{
    protected static $defaultName = 'ya:test';
    /**
     * @var ConfigService
     */
    private $configService;
    /**
     * @var OrdersRepository
     */
    private $ordersRepository;

    public function __construct($name = null, ConfigService $configService, OrdersRepository $ordersRepository)
    {
        parent::__construct($name);
        $this->configService = $configService;
        $this->ordersRepository = $ordersRepository;
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $order = $this->ordersRepository->find(80);

        $client = new Client();
        $client->setAuth(
            $this->configService->get('yandex_shop_id'),
            $this->configService->get('yandex_secret_key')
        );

        $idempotenceKey = uniqid('', true);

        $response = $client->createPayment(
            array(
                'amount' => array(
                    'value' => $order->getTotalSum(),
                    'currency' => 'RUB',
                ),
                'payment_method_data' => array(
                    'type' => 'bank_card',
                ),
                'confirmation' => array(
                    'type' => 'redirect',
                    'return_url' => $this->configService->get('yandex_return_url')
                ),
                'description' => 'Заказ №' . $order->getId(),
            ),
            $idempotenceKey
        );

//        $response = $client->createReceipt(
//            array(
//                'customer' => array(
//                    'full_name' => 'Ivanov Ivan Ivanovich',
//                    'phone' => '+79000000000',
//                    'email' => 'email@email.ru',
//                    'inn'   => '6321341814',
//                ),
//                'payment_id' => '25f2ca07-000f-5000-8000-1653e6f5fede',
//                'type' => 'payment',
//                'send' => true,
//                'items' => array(
//                    array(
//                        'description' => 'Наименование товара 1',
//                        'quantity' => '1.00',
//                        'amount' => array(
//                            'value' => '14000.00',
//                            'currency' => 'RUB',
//                        ),
//                        'vat_code' => 1,
//                        'payment_mode' => 'full_payment',
//                        'payment_subject' => 'commodity',
//                        'country_of_origin_code' => 'CN',
//                    ),
//                    array(
//                        'description' => 'Наименование товара 2',
//                        'quantity' => '1.00',
//                        'amount' => array(
//                            'value' => '1000.00',
//                            'currency' => 'RUB',
//                        ),
//                        'vat_code' => 2,
//                        'payment_mode' => 'full_payment',
//                        'payment_subject' => 'commodity',
//                        'country_of_origin_code' => 'CN',
//                    )
//                ),
//                'settlements' => array(
//                    array(
//                        'type' => 'prepayment',
//                        'amount' => array(
//                            'value' => '8000.00',
//                            'currency' => 'RUB',
//                        )
//                    ),
//                    array(
//                        'type' => 'prepayment',
//                        'amount' => array(
//                            'value' => '7000.00',
//                            'currency' => 'RUB',
//                        )
//                    )
//                ),
//            ),
//            uniqid('', true)
//        );

        //get confirmation url
        $confirmationUrl = $response->getConfirmation()->getConfirmationUrl();
        var_dump($confirmationUrl);
        die();
        echo "<pre>";
        print_r(get_class_methods($client));
        die('==asdf=asdf=');
        $output->writeln(['Success']);
    }
}