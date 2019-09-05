<?php

namespace App\Repository;

use App\Entity\PageUrl;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use App\Service\LpService;

/**
 * @method PageUrl|null find($id, $lockMode = null, $lockVersion = null)
 * @method PageUrl|null findOneBy(array $criteria, array $orderBy = null)
 * @method PageUrl[]    findAll()
 * @method PageUrl[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PageUrlRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PageUrl::class);
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
    //  * @return PageUrl[] Returns an array of PageUrl objects
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
    public function findOneBySomeField($value): ?PageUrl
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
