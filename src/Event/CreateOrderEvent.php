<?php

namespace App\Event;

use App\Entity\Orders;
use Symfony\Component\EventDispatcher\Event;

class CreateOrderEvent extends Event
{
    const NAME = 'order.create';

    /**
     * @var Orders
     */
    private $order;

    public function __construct(Orders $order)
    {
        $this->order = $order;
    }

    /**
     * @return Orders
     */
    public function getOrder()
    {
        return $this->order;
    }
}