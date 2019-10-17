<?php

namespace App\Repository;

use App\Entity\StoreUrl;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method StoreUrl|null find($id, $lockMode = null, $lockVersion = null)
 * @method StoreUrl|null findOneBy(array $criteria, array $orderBy = null)
 * @method StoreUrl[]    findAll()
 * @method StoreUrl[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StoreUrlRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, StoreUrl::class);
    }

    public function findByUrl(string $url)
    {
        return $this->createQueryBuilder('u')
            ->where('u.url = :url')
            ->setParameter('url', $url)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // /**
    //  * @return StoreUrl[] Returns an array of StoreUrl objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?StoreUrl
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
