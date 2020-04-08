<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 06.04.2020.
 */

namespace App\Bundles\InstashopBundle\Repository;

use Error;
use DateTime;
use Exception;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\Mapping\ClassMetadata;
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
     * @return bool
     * @throws Exception
     */
    public function import(Collection $collection): bool
    {
        if ($collection->isEmpty() === false) {
            $this->_em->beginTransaction();
            try {
                foreach ($collection->getItems() as $item) {
                    if (!empty($item['id']) && !empty($item['path'])) {
                        $model = new Entity();
                        $model->setInstagramId($item['id']);
                        $model->setPath($item['path']);
                        $model->setStatus(Entity::RAW);
                        $model->setDescription(null);
                        $model->setCreated(new DateTime());
                        $this->_em->persist($model);
                        $this->_em->flush();
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

    // /**
    //  * @return Instashop[] Returns an array of Instashop objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */
    /*
    public function findOneBySomeField($value): ?Instashop
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
