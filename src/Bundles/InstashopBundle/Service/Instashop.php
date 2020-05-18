<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 07.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;

/**
 * Class Instashop
 *
 * @package App\Bundles\InstashopBundle\Service
 */
class Instashop
{
    /**
     * @var string
     */
    private $query;
    /**
     * @var ProviderInterface
     */
    private $provider;

    /**
     * Instashop constructor.
     *
     * @param ProviderInterface provider
     */
    public function __construct(ProviderInterface $provider)
    {
        $this->provider = $provider;
    }

    public function get(): Collection
    {
        $items = $this->provider->setQueryString($this->getQuery())->get();
        return new Collection($items);
    }

    /**
     * @return string
     */
    public function getQuery(): string
    {
        return $this->query;
    }

    /**
     * @param string $query
     * @return $this
     */
    public function setQuery(string $query): self
    {
        $this->query = $query;
        return $this;
    }
}