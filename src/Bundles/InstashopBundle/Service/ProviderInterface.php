<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 15.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;

/**
 * Interface ProviderInterface
 *
 * @package App\Bundles\InstashopBundle\Service
 */
interface ProviderInterface
{
    /**
     * @return string
     */
    public function getName(): string;

    /**
     * @return array
     */
    public function get(): array;

    /**
     * @param string $query
     * @return self
     */
    public function setQueryString(string $query): self;
}