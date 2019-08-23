<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\AuthenticatorService;

class AuthAlias implements ResolverInterface, AliasedInterface {

    public $user;

    public $em;

    private $request;

    public function __construct(
        EntityManager $em,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService
    ) {
        $this->em = $em;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
            $token = $this->request->headers->get('Authorization');
            $token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjQwNTMyODcsImV4cCI6MTU2NDA1Njg4Nywicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFpQHJvYm8ucnUifQ.lKQWldbBMGMdjqysCVXbxe-DvSA0c3qoX4HK2ZEVLfeqItrfhfsLK_ynzh_r4t0ViALFdXBmHx5dc6u9N3ybOTguVwG7HX9NWtct63u-QWAN0_PW1zrfSpMpO4h42mOuEeaG27dv_nfc-UHZIaKTwZupGhAJcxEw25fDrowM8YvxKbJRBJI3-p4TtkyGiKbW7u8Avne7a5BqNTaYM6CQZM8jSeDW9PcF_mjjJVf8yaHmcygbzYD0JxdOM0nG23cM-e1nk4kWRS6oPc6-mltMlK4h7y7PVc1xrGOoAWitEBRE-DwE0WLM0uzuthC7j-BQPMv6udpJ2lu1aE56qYOTjGi1eIF87BHYgRFQpAXZb_B5nEz5VgiXcwZEUDf6_XJ7t9wW7c4NBbkhpcEoteANdsLXttLJUvh7KpejZHLREvDbzBeUGEyC0NiO8rDbNosgcvGHPaLba58wDm_bMXFA5G59IaX2-A9aQVP1yJg_FLEmoMkS3_bYdJGeioaV712Z5bnCRCpdUGYOAEZtsDpZUXvUgKEcwI3ad-MzBM26AHb_1X3nIBI-aI0Bcth1OUOSDdjhiA9HedEkCdABCikvHEkSJ2sroh11GVov9gLc52GyZNHYJGf7nyX14fO7ZSjLtBvCM6oqT6JrRC6xm8fvINd4SO1bkkKlOVBffTPYJKc';
            if($token && $user = $authenticatorService->authByToken($token)) {
                $this->user = $user;
                return;
            }
        }
    }

    public function getSessionKey()
    {
        $sessionKey = '';
        if($this->request) {
            $cookies = explode('; ', $this->request->headers->get('cookie'));
            if(count($cookies)) {
                foreach($cookies as $cookie) {
                    $cookie = explode('=', $cookie);
                    if(count($cookie) == 2 && $cookie[0] == 'session_key') {
                        $sessionKey = $cookie[1];
                    }
                }
            }
        }
        return $sessionKey;
    }

    public function getUser()
    {
        if($this->user) {
            return $this->user;
        }
        return false;
    }

    public function getAuthKey()
    {
        return ($this->getUser()) ? $this->getUser()->getId() : $this->getSessionKey();
    }

    public static function getAliases()
    {
        return [
            'resolve' => self::class
        ];
    }
}
