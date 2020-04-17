<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 17.04.2020.
 */

namespace App\Bundles\InstashopBundle\Repository;

use Redis;
use Symfony\Component\HttpFoundation\Request;
use App\Bundles\InstashopBundle\Traits\Locale;
use App\Bundles\InstashopBundle\Service\Collection;
use App\Bundles\InstashopBundle\Entity\Instashop as Entity;
use App\Bundles\InstashopBundle\Repository\InstashopRepository as Repository;

/**
 * Class RedisRepository
 *
 * @package App\Bundles\InstashopBundle\Repository
 */
class RedisRepository
{
    use Locale;

    public const PER_PAGE = 12;
    public const REDIS_IMAGES_KEY = 'instashop:gallery:images';
    public const REDIS_TIME_OUT = 60 * 60 * 6;
    /**
     * @var Redis
     */
    private $redis;
    /**
     * @var InstashopRepository
     */
    private $repository;

    /**
     * InstashopRepository constructor.
     *
     * @param InstashopRepository $repository
     * @param Redis $redis
     */
    public function __construct(Repository $repository, Redis $redis)
    {
        $this->repository = $repository;
        $this->redis = $redis;
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getGallery(Request $request): array
    {
        $offset = abs((int)$request->query->get('page', 0));
        if ($offset === 1) {
            $offset = 0;
        }
        $key = $this->getRedisKey($offset);
        $images = $this->redis->get($key);
        if ($images === null || $images === false) {
            $collection = new Collection();
            $this->repository->setLocale($this->getLocale());
            $collection->setItems(
                $this->repository->findBy(
                    [
                        'status'  => Entity::APPROVED,
                        'visible' => true,
                    ],
                    ['purchases' => 'DESC', 'clicks' => 'DESC', 'created' => 'DESC'],
                    self::PER_PAGE,
                    $offset * self::PER_PAGE
                )
            );
            $status = $this->redis->set(
                $key,
                $this->repository->listToJson($collection),
                self::REDIS_TIME_OUT
            );
            if ($status) {
                $images = $this->redis->get($key);
            }
        }
        return json_decode($images, true);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function resetGallery(Request $request): array
    {
        $this->redis->del(self::REDIS_IMAGES_KEY);
        return $this->getGallery($request);
    }

    /**
     * @param int $suffix
     * @return string
     */
    private function getRedisKey(int $suffix = 0): string
    {
        return self::REDIS_IMAGES_KEY . ":{$suffix}";
    }
}
