<?php

namespace App\Repository;

use App\Entity\Lense;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Lense|null find($id, $lockMode = null, $lockVersion = null)
 * @method Lense|null findOneBy(array $criteria, array $orderBy = null)
 * @method Lense[]    findAll()
 * @method Lense[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LenseRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Lense::class);
    }

    // /**
    //  * @return Lense[] Returns an array of Lense objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Lense
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
