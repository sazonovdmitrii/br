<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 09.04.2020.
 */

namespace App\Bundles\InstashopBundle\Repository;

use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\Bundles\InstashopBundle\Entity\InstashopTranslation as Entity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Entity|null find($id, $lockMode = null, $lockVersion = null)
 * @method Entity|null findOneBy(array $criteria, array $orderBy = null)
 * @method Entity[]    findAll()
 * @method Entity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TranslationRepository extends ServiceEntityRepository
{
    /**
     * @var ClassMetadata
     */
    private $table;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Entity::class);
        $this->table = $this->getEntityManager()->getClassMetadata(Entity::class);
    }
}
