<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;
/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 */
class ProductTagTranslation
{
    use ORMBehaviors\Translatable\Translation;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
