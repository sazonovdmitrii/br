<?php
namespace App\GraphQL\Resolver;

use App\Repository\PaymentMethodRepository;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class PaymentsMethodsResolver implements ResolverInterface, AliasedInterface
{
    private $em;
    /**
     * @var PaymentMethodRepository
     */
    private $paymentMethodRepository;

    public function __construct(
        EntityManager $entityManager,
        PaymentMethodRepository $paymentMethodRepository
    ) {
        $this->em = $entityManager;
        $this->paymentMethodRepository = $paymentMethodRepository;
    }

    public function resolve()
    {
        $paymentsMethods = $this->paymentMethodRepository->findAll();
        return [
            'data' => $paymentsMethods
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'PaymentsMethods'
        ];
    }
}