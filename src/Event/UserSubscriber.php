<?php

namespace App\Event;

use App\Mailer\Mailer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserSubscriber implements EventSubscriberInterface
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
            RestorePasswordEvent::NAME => 'onRestorePassword'
        ];
    }

    public function onRestorePassword(RestorePasswordEvent $event)
    {
        $this->mailer->sendRestorePasswordEmail($event->getUser());
    }
}