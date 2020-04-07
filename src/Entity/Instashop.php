<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 06.04.2020.
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Bundles\InstashopBundle\Entity\Instashop as ParentEntity;

/**
 * @ORM\Entity(repositoryClass="App\Bundles\InstashopBundle\Repository\InstashopRepository")
 */
class Instashop extends ParentEntity
{
}
