<?php
namespace App\GraphQL\Mutation;

use App\Service\AuthenticatorService;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AuthMutation implements MutationInterface
{
    public $user;

    private $authenticatorService;

    private $request;

    public function __construct(
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService
    ) {
        $this->redis = $redis;
        $this->authenticatorService = $authenticatorService;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
        }
        $token = $this->request->headers->get('Authorization');
        $token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjQ2NDQ4NDYsImV4cCI6MTU2NDY0ODQ0Niwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFpQHJvYm8ucnUifQ.aZ_yR5xDGYYtryt0x6CNTwrNR8wEV9GbrAal6DoneUg41598-CTN6V4L_nrNn-6ArET7BVD7vqLYfI-HraboRbh5bdvTCI8Yo4gy26pli-4bwQ1dmUkosXbgrM5JwC3vGc-vXEhxHh0hQDku4LJ8UsyGXnfNCib3JSOi0u9674p59hs-8d_qwVeOKU63ZLKQERm-phGCx9RC39stBI3lnhgBz1M2dJCFEtAfSFmMOSfBqGqwfZxe9z_GKCUUt3EH9yso9dPG1XrmpKRWVzK84ESr3Mru12obx0a9QfzdvAkuVkHjKtJYd029-gr-6ouW2E8jSvA2OAUNNagjTcawBRbPAqvdoi66ItNOucz_ho4xBCukX7F5nbDGpQOKdbD5qBGzITdukS6KdekgTmjnqnkKTcVdiZKoHpkUSSIXNbXTfrXwvlNaxn-YRN5EF1BmylDXk9l_zQVJb5dV05xlz4ef1JCNbWJNb4kONphnQAfh32qsmAnuCuzEbiW5h7yL5ZNNegrhSHjm54qjeF8otmIA1gDjMQ1nWLiturUe-oCl1ibiHhD20CbJnTHVdCjo5YE-0yWev0LP2nBgNusB_q9w0GCFp65QsEjIUeeHhBCcjD9uMYp1ON8pgubydTKuxb5DNRErnVsxy-5JuI0u3ju-n9KJepW_HDi9AcdaA8c';
        if($token && $user = $this->authenticatorService->authByToken($token)) {
            $this->user = $user;
            return;
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
}
