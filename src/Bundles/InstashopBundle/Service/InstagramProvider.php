<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 15.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;


/**
 * Class InstagramProvider
 * @package App\Bundles\InstashopBundle\Service
 */
class InstagramProvider implements ProviderInterface
{
    private $query;

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
        $this->query = mb_strtolower(trim($query));
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return 'instagram';
    }
}