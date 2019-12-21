<?php
namespace App\GraphQL\Resolver;

use App\Repository\AddressRepository;
use Doctrine\ORM\EntityManager;
use App\Service\AuthenticatorService;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Psr\Log\LoggerInterface;

class AddressesResolver extends AuthAlias
{
    public $em;

    private $authenticatorService;

    private $request;

    private $logger;
    /**
     * @var AddressRepository
     */
    private $addressRepository;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        AuthenticatorService $authenticatorService,
        ContainerInterface $container,
        LoggerInterface $logger,
        AddressRepository $addressRepository
    ) {
        $this->em = $em;
        $this->authenticatorService = $authenticatorService;
        $this->logger = $logger;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
        }
        parent::__construct($em, $container, $authenticatorService);
        $this->addressRepository = $addressRepository;
    }

    /**
     * @return mixed
     */
    public function resolve()
    {
        if($this->getUser()) {
            return [
                'data' => $this->getUser()->getAddresses()
            ];
        } else {
            return [
                'data' => $this->addressRepository->findBy(['session_key' => $this->getAuthKey()])
            ];
        }
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Addresses'
        ];
    }
}