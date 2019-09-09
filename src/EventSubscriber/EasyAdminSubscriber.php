<?php
namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\EventDispatcher\GenericEvent;
use App\Entity\ProductItemTagItem;
use EasyCorp\Bundle\EasyAdminBundle\Event\EasyAdminEvents;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Request;

class EasyAdminSubscriber implements EventSubscriberInterface
{
    private $request;

    public function __construct(
        RequestStack $request
    ) {
        $this->request = $request;
    }

    public static function getSubscribedEvents()
    {
        return [
            EasyAdminEvents::POST_NEW => ['setNewEntityId']
        ];
    }

    public function setNewEntityId(GenericEvent $event)
    {
        $entity = $event->getSubject();

        if (!($entity instanceof ProductItemTagItem)) {
            return;
        }

        $entity->setEntityId($this->request->getCurrentRequest()->query->get('entity_id'));

        $event['entity'] = $entity;
    }
}