<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 17.04.2020.
 */

namespace App\Bundles\InstashopBundle\Repository;

use Error;
use DateTime;
use Exception;
use App\Entity\Product;
use App\Bundles\InstashopBundle\Traits\Locale;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\Bundles\InstashopBundle\Service\Collection;
use App\Bundles\InstashopBundle\Entity\Instashop as Entity;
use Doctrine\DBAL\{DBALException, Platforms\PostgreSQL100Platform};
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\{ORMException, Mapping\ClassMetadata, OptimisticLockException};

/**
 * @method Entity|null find($id, $lockMode = null, $lockVersion = null)
 * @method Entity|null findOneBy(array $criteria, array $orderBy = null)
 * @method Entity[]    findAll()
 * @method Entity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InstashopRepository extends ServiceEntityRepository
{
    use Locale;

    /**
     * @var ClassMetadata
     */
    private $table;

    /**
     * InstashopRepository constructor.
     *
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Entity::class);
        $this->table = $this->getEntityManager()->getClassMetadata(Entity::class);
    }

    /**
     * @param Collection $collection
     * @param string $hashTag
     * @return bool
     * @throws Exception
     */
    public function import(Collection $collection, string $hashTag): bool
    {
        if ($collection->isEmpty() === false) {
            $this->_em->beginTransaction();
            try {
                foreach ($collection->getItems() as $item) {
                    if (!empty($item['id']) && !empty($item['path'])) {
                        $entity = new Entity();
                        $entity->setInstagramId($item['id']);
                        $entity->setHashTag($hashTag);
                        $entity->setPath($item['path']);
                        $entity->setCoordinates([]);
                        $entity->setStatus(Entity::RAW);
                        $entity->setVisible(true);
                        $entity->setCreated(new DateTime());
                        $this->save($entity);
                    }
                }
                $this->_em->commit();
            } catch (Exception $exception) {
                $this->_em->rollBack();
                throw $exception;
            } catch (Error $exception) {
                $this->_em->rollBack();
                throw $exception;
            }
        }
        return true;
    }

    /**
     * @return $this
     * @throws DBALException
     */
    public function truncate(): self
    {
        $table = $this->table->getTableName();
        $sequence = $this->table->getSequenceName(new PostgreSQL100Platform);
        $queries = [
            "TRUNCATE {$table} RESTART IDENTITY CASCADE",
            "ALTER SEQUENCE {$sequence} RESTART WITH 1",
            "UPDATE {$table} SET id=nextval('{$sequence}')",
        ];
        foreach ($queries as $query) {
            $statement = $this->_em->getConnection()->prepare($query);
            $statement->execute();
        }
        return $this;
    }

    /**
     * @param int $entityId
     * @return bool
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function approve(int $entityId): bool
    {
        $entity = $this->find($entityId);
        if ($entity !== null) {
            $entity->setStatus(Entity::APPROVED);
            return $this->save($entity);
        }
        return false;
    }

    /**
     * @param int $entityId
     * @return bool
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function reject(int $entityId): bool
    {
        $entity = $this->find($entityId);
        if ($entity !== null) {
            $entity->setStatus(Entity::REJECTED);
            return $this->save($entity);
        }
        return false;
    }

    /**
     * @param mixed $entity
     * @param array $productsIds
     * @return bool
     * @throws ORMException
     */
    public function joinProducts($entity, array $productsIds = []): bool
    {
        if ($entity instanceof Entity) {
            foreach ($productsIds as $productsId) {
                $product = $this->_em->getReference(Product::class, $productsId);
                if ($product instanceof Product) {
                    $entity->addInstashopProduct($product);
                }
            }
        }
        return $this->save($entity);
    }

    /**
     * @param $entity
     * @param string $jsonCoordinates
     * @return bool
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function saveCoordinates($entity, string $jsonCoordinates = ''): bool
    {
        if ($entity instanceof Entity) {
            $entity->setCoordinates($jsonCoordinates);
            return $this->save($entity);
        }
        return false;
    }

    /**
     * @param int $entityId
     * @return bool
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function click(int $entityId): bool
    {
        $entity = $this->find($entityId);
        if ($entity !== null) {
            $entity->addClick();
            return $this->save($entity);
        }
        return false;
    }

    /**
     * @param int $entityId
     * @return bool
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function purchase(int $entityId): bool
    {
        $entity = $this->find($entityId);
        if ($entity !== null) {
            $entity->addPurchase();
            return $this->save($entity);
        }
        return false;
    }

    /**
     * @param mixed $entityIds
     * @return bool
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function purchases($entityIds): bool
    {
        if (is_string($entityIds)) {
            $entityIds = json_decode($entityIds, true);
        }
        if (is_array($entityIds)) {
            foreach ($entityIds as $id) {
                $this->purchase($id);
            }
            return true;
        }
        return false;
    }

    /**
     * @param string $tag
     * @return array
     */
    public function findByTag(string $tag): array
    {
        $collection = new Collection();
        $collection->setItems(
            $this->findBy(
                [
                    'hash_tag' => '#' . preg_replace('/#/', '', $tag),
                    'status'   => Entity::APPROVED,
                    'visible'  => true,
                ],
                ['purchases' => 'DESC', 'clicks' => 'DESC', 'created' => 'DESC']
            )
        );
        return $this->toList($collection);
    }

    /**
     * @param Entity $entity
     * @return bool
     * @throws ORMException
     * @throws OptimisticLockException
     */
    private function save(Entity $entity): bool
    {
        $this->_em->persist($entity);
        $this->_em->flush();
        return true;
    }

    /**
     * @param Collection $collection
     * @return array
     */
    private function toList(Collection $collection): array
    {
        $images = [];
        foreach ($collection->getItems() as $image) {
            if ($image instanceof Entity) {
                $images[] = [
                    'id'          => $image->getId(),
                    'path'        => $image->getPath(),
                    'tag'         => $image->getHashTag(),
                    'title'       => $image->getTitle($this->getLocale()),
                    'description' => $image->getDescription($this->getLocale()),
                    'purchases'   => $image->getPurchases(),
                    'clicks'      => $image->getClicks(),
                    'created'     => $image->getCreated()->format('Y-m-d H:i:s'),
                    'products'    => $image->getProducts(),
                ];
            }
        }
        return $images;
    }

    /**
     * @param Collection $collection
     * @return string
     */
    public function listToJson(Collection $collection): string
    {
        return json_encode(
            $this->toList($collection),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
    }
}
