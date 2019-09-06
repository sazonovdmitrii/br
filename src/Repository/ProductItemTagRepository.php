<?php

namespace App\Repository;

use App\Entity\ProductItemTag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductItemTag|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductItemTag|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductItemTag[]    findAll()
 * @method ProductItemTag[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductItemTagRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductItemTag::class);
    }

    // /**
    //  * @return ProductItemTag[] Returns an array of ProductItemTag objects
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
    public function findOneBySomeField($value): ?ProductItemTag
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
