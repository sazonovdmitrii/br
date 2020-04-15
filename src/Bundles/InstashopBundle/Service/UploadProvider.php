<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 15.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;

use Exception;
use App\Service\EnvService;

/**
 * Class UploadProvider
 *
 * @package App\Bundles\InstashopBundle\Service
 */
class UploadProvider implements ProviderInterface
{
    /**
     * @var string
     */
    private $filePath = '';
    /**
     * @var EnvService
     */
    private $envService;

    /**
     * UploadProvider constructor.
     *
     * @param EnvService $envService
     */
    public function __construct(EnvService $envService)
    {
        $this->envService = $envService;
    }

    /**
     * @return array|array[]
     * @throws Exception
     */
    public function get(): array
    {
        if (file_exists($this->filePath)) {
            return [
                [
                    'id'   => $this->getImageId(),
                    'path' => $this->envService->getDomain('/images/instashop/' . basename($this->filePath)),
                ],
            ];
        }
        return [];
    }

    /**
     * @param string $query
     * @return ProviderInterface
     */
    public function setQueryString(string $query): ProviderInterface
    {
        $this->filePath = $query;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return 'upload';
    }

    /**
     * @return string
     * @throws Exception
     */
    private function getImageId(): string
    {
        return (int)microtime(true) + random_int(100, 1000);
    }
}