<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductCollectionUrlRepository")
 */
class ProductCollectionUrl
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
    private $url;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ProductCollection", mappedBy="urls")
     */
    private $productCollections;

    public function __construct()
    {
        $this->productCollections = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): self
    {
        $this->url = $url;

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

    public function __toString()
    {
        return self::getUrl();
    }

    /**
     * @return Collection|ProductCollection[]
     */
    public function getProductCollections(): Collection
    {
        return $this->productCollections;
    }

    public function addProductCollection(ProductCollection $productCollection): self
    {
        if (!$this->productCollections->contains($productCollection)) {
            $this->productCollections[] = $productCollection;
            $productCollection->addUrl($this);
        }

        return $this;
    }

    public function removeProductCollection(ProductCollection $productCollection): self
    {
        if ($this->productCollections->contains($productCollection)) {
            $this->productCollections->removeElement($productCollection);
            $productCollection->removeUrl($this);
        }

        return $this;
    }
}
