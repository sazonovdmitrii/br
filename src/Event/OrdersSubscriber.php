<?php

namespace App\Event;

use App\Mailer\Mailer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class OrdersSubscriber implements EventSubscriberInterface
{
    /**
     * @var Mailer
     */
    private $mailer;

    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            CreateOrderEvent::NAME => 'onOrderCreate'
        ];
    }

    public function onOrderCreate(CreateOrderEvent $event)
    {
        $this->mailer->sendOrderCreateEmail($event->getOrder());
    }
}