<?php

namespace App\Repository;

use App\Entity\LandingBlock;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method LandingBlock|null find($id, $lockMode = null, $lockVersion = null)
 * @method LandingBlock|null findOneBy(array $criteria, array $orderBy = null)
 * @method LandingBlock[]    findAll()
 * @method LandingBlock[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LandingBlockRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, LandingBlock::class);
    }

    // /**
    //  * @return LandingBlock[] Returns an array of LandingBlock objects
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
    public function findOneBySomeField($value): ?LandingBlock
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
