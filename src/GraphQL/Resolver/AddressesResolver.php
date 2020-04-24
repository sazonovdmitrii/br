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
    public function resolve($args)
    {
        if($this->getUser()) {
            $addresses = $this->getUser()->getAddresses();
        } else {
            $addresses = $this->addressRepository->findBy(
                ['session_key' => $this->getAuthKey()]
            );
        }

        if(isset($args['city_fias_id'])) {
            $addresses = $addresses->filter(function($address) use ($args) {
                    return $address->getCityFiasId() == $args['city_fias_id'];
                }
            );
        }

        return [
            'data' => $addresses
        ];
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