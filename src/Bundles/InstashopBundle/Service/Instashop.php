<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 07.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;


/**
 * Class Instashop
 * @package App\Bundles\InstashopBundle\Service
 */
class Instashop
{
    /**
     * @var ProviderInterface
     */
    private $provider;

    /**
     * Instashop constructor.
     * @param ProviderInterface provider
     */
    public function __construct(ProviderInterface $provider)
    {
        $this->provider = $provider;
    }

    /**
     * @return array
     */
    public function search(): array
    {
        dd(\get_class($this->provider));
        return $this->provider->get();
    }
}