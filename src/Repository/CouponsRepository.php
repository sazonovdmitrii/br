<?php

namespace App\Repository;

use App\Entity\Coupons;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Coupons|null find($id, $lockMode = null, $lockVersion = null)
 * @method Coupons|null findOneBy(array $criteria, array $orderBy = null)
 * @method Coupons[]    findAll()
 * @method Coupons[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CouponsRepository extends ServiceEntityRepository
{
    /**
     * CouponsRepository constructor.
     *
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Coupons::class);
    }

    /**
     * @param string $couponCode
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findByCode(string $couponCode)
    {
        return $this->createQueryBuilder('c')
            ->where('c.code = :couponCode')
            ->setParameter('couponCode', $couponCode)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
