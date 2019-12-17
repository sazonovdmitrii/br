<?php

namespace App\Repository;

use App\Entity\LenseTag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method LenseTag|null find($id, $lockMode = null, $lockVersion = null)
 * @method LenseTag|null findOneBy(array $criteria, array $orderBy = null)
 * @method LenseTag[]    findAll()
 * @method LenseTag[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LenseTagRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, LenseTag::class);
    }

    /**
    * @return LenseTag[] Returns an array of LenseTag objects
    */
    public function findByType($type)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.type = :type')
            ->setParameter('type', $type)
            ->getQuery()
            ->getResult()
        ;
    }

    /*
    public function findOneBySomeField($value): ?LenseTag
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
