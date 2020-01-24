<?php

namespace App\Repository;

use App\Entity\BannerItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method BannerItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method BannerItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method BannerItem[]    findAll()
 * @method BannerItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BannerItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, BannerItem::class);
    }

    // /**
    //  * @return BannerItem[] Returns an array of BannerItem objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BannerItem
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
