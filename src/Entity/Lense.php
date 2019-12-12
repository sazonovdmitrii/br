<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LenseRepository")
 */
class Lense
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $brand;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $price;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\LenseItemTag", inversedBy="lenses")
     */
    private $lenseitemstags;

    private $covering;

    private $thickness;

    private $function;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", mappedBy="lenses")
     */
    private $products;


    public function __construct()
    {
        $this->lenseitemstags = new ArrayCollection();
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(?string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection|LenseItemTag[]
     */
    public function getLenseitemstags(): Collection
    {
        return $this->lenseitemstags;
    }

    public function addLenseitemstag(LenseItemTag $lenseitemstag): self
    {
        if (!$this->lenseitemstags->contains($lenseitemstag)) {
            $this->lenseitemstags[] = $lenseitemstag;
        }

        return $this;
    }

    public function removeLenseitemstag(LenseItemTag $lenseitemstag): self
    {
        if ($this->lenseitemstags->contains($lenseitemstag)) {
            $this->lenseitemstags->removeElement($lenseitemstag);
        }

        return $this;
    }

    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->addLense($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->contains($product)) {
            $this->products->removeElement($product);
            $product->removeLense($this);
        }

        return $this;
    }

    public function __toString()
    {
        return self::getName();
    }
}
