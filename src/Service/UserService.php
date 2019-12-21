<?php
namespace App\Service;
use App\GraphQL\Input\RegisterInput;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManager;
use App\Entity\Users;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTFailureException;
use Symfony\Component\ExpressionLanguage\Tests\Node\Obj;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;
use Doctrine\Common\Persistence\ObjectManager;

class UserService
{
    private $passwordEncoder;

    private $em;

    private $manager;

    private $jwtManager;
    /**
     * @var UsersRepository
     */
    private $usersRepository;

    /**
     * UserService constructor.
     *
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param EntityManager $em
     * @param JWTTokenManagerInterface $JWTManager
     * @param ObjectManager $objectManager
     * @param UsersRepository $usersRepository
     */
    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        EntityManager $em,
        JWTTokenManagerInterface $JWTManager,
        ObjectManager $objectManager,
        UsersRepository $usersRepository
    ) {
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
        $this->jwtManager = $JWTManager;
        $this->manager = $objectManager;
        $this->usersRepository = $usersRepository;
    }

    /**
     * @param RegisterInput $input
     * @return Users
     */
    public function create(RegisterInput $input)
    {
        $user = new Users();
        $user->setEmail($input->email);
        $user->setPassword(
            $this->passwordEncoder->encodePassword($user, $input->password)
        );
        $user->setRoles([Users::ROLE_USER]);
        $user->setFirstname($input->firstname);
        $user->setLastname($input->lastname);
        $user->setGender($input->gender);
        $this->manager->persist($user);
        $this->manager->flush();
        return $user;
    }

    public function byEmail(string $email)
    {
        return $this->usersRepository->findByEmail($email);
    }
}