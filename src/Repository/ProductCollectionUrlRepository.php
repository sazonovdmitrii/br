<?php

namespace App\Repository;

use App\Entity\ProductCollectionUrl;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ProductCollectionUrl|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductCollectionUrl|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductCollectionUrl[]    findAll()
 * @method ProductCollectionUrl[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductCollectionUrlRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductCollectionUrl::class);
    }

    // /**
    //  * @return ProductCollectionUrl[] Returns an array of ProductCollectionUrl objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ProductCollectionUrl
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
