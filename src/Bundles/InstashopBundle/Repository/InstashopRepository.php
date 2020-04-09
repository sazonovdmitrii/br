<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 09.04.2020.
 */

namespace App\Bundles\InstashopBundle\Repository;

use Error;
use DateTime;
use Exception;
use Doctrine\ORM\ORMException;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\DBAL\Platforms\PostgreSQL100Platform;
use App\Bundles\InstashopBundle\Service\Collection;
use App\Bundles\InstashopBundle\Entity\Instashop as Entity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Entity|null find($id, $lockMode = null, $lockVersion = null)
 * @method Entity|null findOneBy(array $criteria, array $orderBy = null)
 * @method Entity[]    findAll()
 * @method Entity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InstashopRepository extends ServiceEntityRepository
{
    /**
     * @var ClassMetadata
     */
    private $table;

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
            "TRUNCATE {$table} RESTART IDENTITY",
            "ALTER SEQUENCE {$sequence} RESTART WITH 1",
            "UPDATE {$table} SET id=nextval('{$sequence}')"
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
}
