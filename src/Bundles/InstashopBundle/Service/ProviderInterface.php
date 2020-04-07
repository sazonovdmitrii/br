<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 07.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;


/**
 * Interface ProviderInterface
 * @package App\Bundles\InstashopBundle\Service
 */
interface ProviderInterface
{
    /**
     * @return array
     */
    public function get(): array;
}