<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductItemTagRepository")
 */
class ProductItemTag
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ProductItem", inversedBy="productItemTags")
     */
    private $entity;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $slug;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $visible;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductItemTagItem", mappedBy="entity", cascade={"remove"})
     */
    private $productItemTagItems;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $is_on_product_page;

    public function __construct()
    {
        $this->entity = new ArrayCollection();
        $this->productItemTagItems = new ArrayCollection();
        $this->created = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|ProductItem[]
     */
    public function getEntity(): Collection
    {
        return $this->entity;
    }

    public function addEntity(ProductItem $entity): self
    {
        if (!$this->entity->contains($entity)) {
            $this->entity[] = $entity;
        }

        return $this;
    }

    public function removeEntity(ProductItem $entity): self
    {
        if ($this->entity->contains($entity)) {
            $this->entity->removeElement($entity);
        }

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(?string $slug): self
    {
        $this->slug = $slug;

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

    /**
     * @return Collection|ProductItemTagItem[]
     */
    public function getProductItemTagItems(): Collection
    {
        return $this->productItemTagItems;
    }

    public function addProductItemTagItem(ProductItemTagItem $productItemTagItem): self
    {
        if (!$this->productItemTagItems->contains($productItemTagItem)) {
            $this->productItemTagItems[] = $productItemTagItem;
            $productItemTagItem->setEntity($this);
        }

        return $this;
    }

    public function removeProductItemTagItem(ProductItemTagItem $productItemTagItem): self
    {
        if ($this->productItemTagItems->contains($productItemTagItem)) {
            $this->productItemTagItems->removeElement($productItemTagItem);
            // set the owning side to null (unless already changed)
            if ($productItemTagItem->getEntity() === $this) {
                $productItemTagItem->setEntity(null);
            }
        }

        return $this;
    }

    public function __toString()
    {
        return self::class;
    }

    public function getIsOnProductPage(): ?bool
    {
        return $this->is_on_product_page;
    }

    public function setIsOnProductPage(?bool $is_on_product_page): self
    {
        $this->is_on_product_page = $is_on_product_page;

        return $this;
    }
}
