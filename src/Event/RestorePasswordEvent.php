<?php

namespace App\Event;

use App\Entity\Users;
use Symfony\Component\EventDispatcher\Event;

class RestorePasswordEvent extends Event
{
    const NAME = 'user.restore_password';

    /**
     * @var Users
     */
    private $user;

    public function __construct(Users $user)
    {
        $this->user = $user;
    }

    /**
     * @return Users
     */
    public function getUser()
    {
        return $this->user;
    }
}