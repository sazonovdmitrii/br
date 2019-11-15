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
            $token = $this->getAuth('token');
            if($token && $user = $authenticatorService->authByToken($token)) {
                $this->user = $user;
                return;
            }
        }
    }

    public function getAuth($param)
    {
        $token = '';
        if ($this->request) {
            $auth = str_replace('Authorization: ', '', $this->request->headers->get('Authorization'));

            $authData = explode(';', $auth);
            if (count($authData)) {
                foreach ($authData as $authItem) {
                    $authItem = explode('=', $authItem);
                    if (count($authItem) == 2 && $authItem[0] == $param) {
                        $token = $authItem[1];
                    }
                }
            }
        }
        return $token;
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
        return ($this->getUser()) ? $this->getUser()->getId() : $this->getAuth('session');
    }

    public static function getAliases()
    {
        return [
            'resolve' => self::class
        ];
    }
}
