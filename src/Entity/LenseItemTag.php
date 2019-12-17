<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LenseItemTagRepository")
 */
class LenseItemTag
{
    use ORMBehaviors\Translatable\Translatable;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\LenseTag", inversedBy="lenseItemTags")
     */
    private $entity;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $visible;

    /**
     * @ORM\Column(type="decimal", precision=7, scale=2, nullable=true)
     */
    private $price;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Lense", mappedBy="lenseitemstags")
     */
    private $lenses;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Lense", mappedBy="recipes")
     */
    private $lensesByRecipes;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Lense", mappedBy="recipes")
     */
    private $recipes;

    public function __construct()
    {
        $this->created = new \DateTime();
        $this->visible = 1;
        $this->lenses = new ArrayCollection();
        $this->lensesByRecipes = new ArrayCollection();
        $this->recipes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEntity(): ?LenseTag
    {
        return $this->entity;
    }

    public function setEntity(?LenseTag $entity): self
    {
        $this->entity = $entity;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getVisible(): ?bool
    {
        return $this->visible;
    }

    public function setVisible(?bool $visible): self
    {
        $this->visible = $visible;

        return $this;
    }

    public function __toString()
    {
        return self::class;
    }

    public function __call($method, $arguments)
    {
        $method = ('get' === substr($method, 0, 3) || 'set' === substr($method, 0, 3)) ? $method : 'get'. ucfirst($method);

        return $this->proxyCurrentLocaleTranslation($method, $arguments);
    }

    public function __get($name)
    {
        $method = 'get'. ucfirst($name);
        $arguments = [];
        return $this->proxyCurrentLocaleTranslation($method, $arguments);
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection|Lense[]
     */
    public function getLenses(): Collection
    {
        return $this->lenses;
    }

    public function addLense(Lense $lense): self
    {
        if (!$this->lenses->contains($lense)) {
            $this->lenses[] = $lense;
            $lense->addLenseitemstag($this);
        }

        return $this;
    }

    public function removeLense(Lense $lense): self
    {
        if ($this->lenses->contains($lense)) {
            $this->lenses->removeElement($lense);
            $lense->removeLenseitemstag($this);
        }

        return $this;
    }

    /**
     * @return Collection|Lense[]
     */
    public function getLensesByRecipes(): Collection
    {
        return $this->lensesByRecipes;
    }

    public function addLensesByRecipe(Lense $lensesByRecipe): self
    {
        if (!$this->lensesByRecipes->contains($lensesByRecipe)) {
            $this->lensesByRecipes[] = $lensesByRecipe;
            $lensesByRecipe->addRecipe($this);
        }

        return $this;
    }

    public function removeLensesByRecipe(Lense $lensesByRecipe): self
    {
        if ($this->lensesByRecipes->contains($lensesByRecipe)) {
            $this->lensesByRecipes->removeElement($lensesByRecipe);
            $lensesByRecipe->removeRecipe($this);
        }

        return $this;
    }

    /**
     * @return Collection|Lense[]
     */
    public function getRecipes(): Collection
    {
        return $this->recipes;
    }

    public function addRecipe(Lense $recipe): self
    {
        if (!$this->recipes->contains($recipe)) {
            $this->recipes[] = $recipe;
            $recipe->addRecipe($this);
        }

        return $this;
    }

    public function removeRecipe(Lense $recipe): self
    {
        if ($this->recipes->contains($recipe)) {
            $this->recipes->removeElement($recipe);
            $recipe->removeRecipe($this);
        }

        return $this;
    }
}
