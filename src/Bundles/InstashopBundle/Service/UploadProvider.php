<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 07.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;


/**
 * Class UploadProvider
 * @package App\Bundles\InstashopBundle\Service
 */
class UploadProvider implements ProviderInterface
{
    /**
     * @return array
     */
    public function get(): array
    {
        // TODO: Implement get() method.
    }

    /**
     * @param string $query
     * @return ProviderInterface
     */
    public function setQueryString(string $query): ProviderInterface
    {
        return $this;
    }
}