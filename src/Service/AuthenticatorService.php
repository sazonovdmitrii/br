<?php
namespace App\Service;
use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTFailureException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;

class AuthenticatorService
{
    private $passwordEncoder;

    private $em;

    private $jwtManager;

    private $request;

    /**
     * @return mixed
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * @param $request
     * @return $this
     */
    public function setRequest($request)
    {
        $this->request = $request;
        return $this;
    }

    /**
     * AuthenticatorService constructor.
     *
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param EntityManager $em
     */
    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        EntityManager $em,
        JWTTokenManagerInterface $JWTManager
    ) {
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
        $this->jwtManager = $JWTManager;
    }

    /**
     * @param string $email
     * @param string $password
     * @return mixed
     */
    public function auth(string $email, string $password)
    {
        $user = $this->em->getRepository('App:Users')->findByEmail($email);
        if($this->passwordEncoder->isPasswordValid($user, $password)) {
            return $user;
        }
    }

    public function authByToken(string $token)
    {
        try{
            $jwtToken = new JWTUserToken();
            $jwtToken->setRawToken($token);

            $userData = $this->jwtManager->decode($jwtToken);

            if(isset($userData['username']) && $email = $userData['username']) {
                return $this->em
                    ->getRepository('App:Users')
                    ->findByEmail($email);
            }
        } Catch(JWTFailureException $e) {

        }
        return [];
    }

    public function getAuth($param)
    {
        $token = '';
        if ($this->getRequest()) {
//            $auth = $this->getRequest()->headers->get('Authorization');
//            $auth = 'Authorization: session=0b9qlpQDCzT6Ok7SK1t8Y';
//            $auth = str_replace('Authorization: ', '',$auth);

            $auth = str_replace('Authorization: ', '',
//                'Authorization: session=0b9qlpQDCzT6Ok7SK1t8Y;token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzY4Mjc3NzIsImV4cCI6MTYwODM2Mzc3Miwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InNhem9uQG54dC5ydSJ9.lHPSRRwqeAljqAQPjF0EtjO4jBxHwaI9uiNkm6c1QSgwTOfV4u1VdQK18452iR7F-ZbKru5NdZCMUWvgMzEzvHQmM7Mdicuykq0ECgQy4ZxT78FK1LVudLB_H-H5EvGUKu0Hi-76rNgIhb-rqd_fBQTvjYc6PSAVrXn6S9JVA0cuGmIDR08S9r4Y2qjVa2amIqjT2i4Ew3ThzGvw0XPBRFvX-v9iCwB67xt7iuQ1CqiFixDL8VshANwwGB3PFzqU4uToQdYUOgL8Mb7xMpgRSvkosGZWe-Soz6UMVg_xPHAkZuPsyi0vSUOPQyEKG_gv3CikG_7BKj7tv4QTGBsmZ1AAssB0v5CDGo5LfKB3O2zReelFRUtTyP9AwgYEHhVC-3PiBPkDiOM6dBNr4C0O3OdQf1S8Vykjf_Do_E5zq2W283lVgahibd1obPHr_k57lrlsl4L2GGI-s25VUxLHarKOFatTUkOMf5MPFHtv_tk-JkJ1kNEgSI_LBYQZq6IBp0m7Z2oUDlJVlQ_8n3dxbwEKlgU7i_9vfD0_qMFk5petpPedF6MUpJGDl7QRcSvjFfKdXeYnJnJhlMF2FpD-s56Gw011sdl2qVsimD-9WJrJUsDRsRtabxf8-5xy6zhN9Ye6PR8h7-d_8BwmigRchqCzehKgiR5bmY5tCK_r1YU'
                $this->request->headers->get('Authorization')
            );

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
}