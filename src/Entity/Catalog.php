<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;
use Doctrine\Common\Collections\Criteria;
/**
 * @ORM\Entity(repositoryClass="App\Repository\CatalogRepository")
 */
class Catalog
{
    use ORMBehaviors\Translatable\Translatable;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $pid;

    /**
     * @ORM\Column(type="boolean")
     */
    private $visible;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\Column(type="datetime")
     */
    private $updated;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $brand;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CatalogUrl", mappedBy="entity")
     */
    private $catalogUrls;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Sale", mappedBy="category")
     */
    private $sales;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\CatalogTag", mappedBy="entity")
     */
    private $catalogTags;

    private $parsed;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ProductTag", mappedBy="catalog")
     */
    private $productTags;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ProductTagItem", mappedBy="catalog")
     */
    private $productTagItems;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", mappedBy="catalog")
     */
    private $products;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $banner;

    public function __construct()
    {
        $this->catalogUrls = new ArrayCollection();
        $this->sales = new ArrayCollection();
        $this->catalogTags = new ArrayCollection();
        $this->productTags = new ArrayCollection();
        $this->productTagItems = new ArrayCollection();
        $this->created = new \DateTime();
        $this->updated = new \DateTime();
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPid(): ?int
    {
        return $this->pid;
    }

    public function setPid(?int $pid): self
    {
        $this->pid = $pid;

        return $this;
    }

    public function getVisible(): ?bool
    {
        return $this->visible;
    }

    public function setVisible(bool $visible): self
    {
        $this->visible = $visible;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    public function getBrand(): ?bool
    {
        return $this->brand;
    }

    public function setBrand(?bool $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function __toString()
    {
        return (string)$this->id;
    }


    /**
     * @return Collection|CatalogUrl[]
     */
    public function getCatalogUrls(): Collection
    {
        return $this->catalogUrls;
    }

    public function addCatalogUrl(CatalogUrl $catalogUrl): self
    {
        if (!$this->catalogUrls->contains($catalogUrl)) {
            $this->catalogUrls[] = $catalogUrl;
            $catalogUrl->setEntity($this);
        }

        return $this;
    }

    public function removeCatalogUrl(CatalogUrl $catalogUrl): self
    {
        if ($this->catalogUrls->contains($catalogUrl)) {
            $this->catalogUrls->removeElement($catalogUrl);
            // set the owning side to null (unless already changed)
            if ($catalogUrl->getEntity() === $this) {
                $catalogUrl->setEntity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Sale[]
     */
    public function getSales(): Collection
    {
        return $this->sales;
    }

    public function addSale(Sale $sale): self
    {
        if (!$this->sales->contains($sale)) {
            $this->sales[] = $sale;
            $sale->setCategory($this);
        }

        return $this;
    }

    public function removeSale(Sale $sale): self
    {
        if ($this->sales->contains($sale)) {
            $this->sales->removeElement($sale);
            // set the owning side to null (unless already changed)
            if ($sale->getCategory() === $this) {
                $sale->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|CatalogTag[]
     */
    public function getCatalogTags(): Collection
    {
        return $this->catalogTags;
    }

    public function addCatalogTag(CatalogTag $catalogTag): self
    {
        if (!$this->catalogTags->contains($catalogTag)) {
            $this->catalogTags[] = $catalogTag;
            $catalogTag->addEntity($this);
        }

        return $this;
    }

    public function removeCatalogTag(CatalogTag $catalogTag): self
    {
        if ($this->catalogTags->contains($catalogTag)) {
            $this->catalogTags->removeElement($catalogTag);
            $catalogTag->removeEntity($this);
        }

        return $this;
    }

    public function setParsed($parsed)
    {
        $this->parsed = $parsed;
        return $this;
    }

    public function getParsed()
    {
        return $this->parsed;
    }

    /**
     * @return Collection|ProductTag[]
     */
    public function getProductTags(): Collection
    {
        return $this->productTags;
    }

    public function addProductTag(ProductTag $productTag): self
    {
        if (!$this->productTags->contains($productTag)) {
            $this->productTags[] = $productTag;
            $productTag->addCatalog($this);
        }

        return $this;
    }

    public function removeProductTag(ProductTag $productTag): self
    {
        if ($this->productTags->contains($productTag)) {
            $this->productTags->removeElement($productTag);
            $productTag->removeCatalog($this);
        }

        return $this;
    }

    /**
     * @return Collection|ProductTagItem[]
     */
    public function getProductTagItems(): Collection
    {
        return $this->productTagItems;
    }

    public function addProductTagItem(ProductTagItem $productTagItem): self
    {
        if (!$this->productTagItems->contains($productTagItem)) {
            $this->productTagItems[] = $productTagItem;
            $productTagItem->addCatalog($this);
        }

        return $this;
    }

    public function removeProductTagItem(ProductTagItem $productTagItem): self
    {
        if ($this->productTagItems->contains($productTagItem)) {
            $this->productTagItems->removeElement($productTagItem);
            $productTagItem->removeCatalog($this);
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
            $product->addCatalog($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->contains($product)) {
            $this->products->removeElement($product);
            $product->removeCatalog($this);
        }

        return $this;
    }

    public function getBanner(): ?string
    {
        return $this->banner;
    }

    public function setBanner(?string $banner): self
    {
        $this->banner = $banner;

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

    public function getProductCollection()
    {
        return $this->products->matching(
            Criteria::create()->where(
                Criteria::expr()->eq('visible', true)
            )
        )->matching(
            (Criteria::create())->orderBy([
                'id' => Criteria::ASC,
            ])
        );
    }
}
