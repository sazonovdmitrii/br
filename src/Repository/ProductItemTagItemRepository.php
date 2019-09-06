<?php

namespace App\Repository;

use App\Entity\ProductItemTagItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductItemTagItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductItemTagItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductItemTagItem[]    findAll()
 * @method ProductItemTagItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductItemTagItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductItemTagItem::class);
    }

    // /**
    //  * @return ProductItemTagItem[] Returns an array of ProductItemTagItem objects
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
    public function findOneBySomeField($value): ?ProductItemTagItem
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
