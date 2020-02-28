<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;
/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 */
class ProductTranslation
{
    use ORMBehaviors\Translatable\Translation;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $google_title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $google_description;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getGoogleTitle(): ?string
    {
        return $this->google_title;
    }

    public function setGoogleTitle(?string $google_title): self
    {
        $this->google_title = $google_title;

        return $this;
    }

    public function getGoogleDescription(): ?string
    {
        return $this->google_description;
    }

    public function setGoogleDescription(?string $google_description): self
    {
        $this->google_description = $google_description;

        return $this;
    }
}
