<?php
namespace App\GraphQL\Resolver;

use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LocaleAlias implements ResolverInterface, AliasedInterface
{
    private $request;

    private $locale = 'ru';

    public function __construct(
        ContainerInterface $container
    ) {
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
            $locale = $this->request->headers->get('Locale');
            $locale = 'en';
            $this->setLocale($locale);
        }
    }

    public function getLocale()
    {
        return $this->locale;
    }

    public function setLocale($locale)
    {
        $this->locale = $locale;
        return $this;
    }

    public static function getAliases()
    {
        return [
            'resolve' => self::class
        ];
    }
}
