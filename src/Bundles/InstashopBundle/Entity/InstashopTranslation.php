<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 09.04.2020.
 */

namespace App\Bundles\InstashopBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model\Translatable\Translation;


/**
 * Class InstashopTranslation
 * @package App\Bundles\InstashopBundle\Entity
 * @ORM\Entity(repositoryClass="App\Bundles\InstashopBundle\Repository\TranslationRepository")
 * @ORM\Table(name="InstashopTranslations")
 */
class InstashopTranslation
{
    use Translation;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @ORM\JoinTable(name="instashop_product")
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string|null $title
     * @return $this
     */
    public function setTitle(?string $title): self
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     * @return $this
     */
    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }
}
