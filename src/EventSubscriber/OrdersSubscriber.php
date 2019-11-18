<?php

namespace App\EventSubscriber;

use App\Entity\Orders;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;

class OrdersSubscriber implements EventSubscriber
{
    /**
     * @return array
     */
    public function getSubscribedEvents()
    {
        return [
            'postPersist'
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postPersist(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();
        if (!$entity instanceof Orders) {
            return;
        }
        $entityManager = $args->getObjectManager();
        $secretKey     = md5(time());
        $entity->setSecretKey($secretKey);
        $entityManager->flush();
    }
}