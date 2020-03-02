<?php

namespace App\Repository;

use App\Entity\ProductItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductItem[]    findAll()
 * @method ProductItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductItem::class);
    }

    public function findLimit($limit)
    {
        return $this->findBy([], null, $limit);
    }

    public function _queryManager()
    {
        return $this->_em->getConnection();
    }

    public function search($searchable)
    {
        $stmt = $this->_queryManager()->prepare(
            "SELECT pi.id, pi.product_id FROM productitem pi "
            . "JOIN productitemtranslation pit "
            . "ON pit.translatable_id = pi.id "
            . "JOIN product p "
            . "ON p.id = pi.product_id "
            . "WHERE pit.name LIKE '%" . $searchable . "%' OR p.sku LIKE '%" . $searchable . "%'"
        );

        $stmt->execute();
        $productsIds = $stmt->fetchAll();

        $stmt = $this->_queryManager()->prepare(
            "SELECT p.id AS product_id FROM product p "
            . "JOIN producttranslation pt "
            . "ON pt.translatable_id = p.id "
            . "WHERE pt.name LIKE '%" . $searchable . "%'"
        );
        $stmt->execute();
        $productsIds = array_merge($productsIds, $stmt->fetchAll());

        return array_unique(
            array_map(function ($entity) {
                    return $entity['product_id'];
                }, $productsIds
            )
        );
    }

    // /**
    //  * @return ProductItem[] Returns an array of ProductItem objects
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
    public function findOneBySomeField($value): ?ProductItem
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
