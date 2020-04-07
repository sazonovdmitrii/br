<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 06.04.2020.
 */

namespace App\Bundles\InstashopBundle\Repository;

use Doctrine\Common\Persistence\ManagerRegistry;
use App\Bundles\InstashopBundle\Entity\Instashop;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Instashop|null find($id, $lockMode = null, $lockVersion = null)
 * @method Instashop|null findOneBy(array $criteria, array $orderBy = null)
 * @method Instashop[]    findAll()
 * @method Instashop[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InstashopRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Instashop::class);
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
