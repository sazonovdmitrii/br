<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductRepository")
 */
class Product
{
    use ORMBehaviors\Translatable\Translatable;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean", nullable=true)
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
     * @ORM\Column(type="decimal", precision=10, scale=2, nullable=true)
     */
    private $price;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductUrl", mappedBy="entity")
     */
    private $productUrls;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ProductTag", mappedBy="entity_id")
     */
    private $productTags;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ProductTagItem", inversedBy="products")
     */
    private $producttagitem;

    private $tagsArray;

    private $allTagsArray;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Sale", mappedBy="products")
     */
    private $sales;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Catalog", inversedBy="products")
     */
    private $catalog;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductItem", mappedBy="product")
     */
    private $productItems;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $sku;

    public function __construct()
    {
        $this->catalog = new ArrayCollection();
        $this->catalogs = new ArrayCollection();
        $this->productUrls = new ArrayCollection();
        $this->productTags = new ArrayCollection();
        $this->producttagitem = new ArrayCollection();
        $this->sales = new ArrayCollection();
        $this->created = new \DateTime();
        $this->updated = new \DateTime();
        $this->productItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price): self
    {
        $this->price = $price;

        return $this;
    }

    public function __toString()
    {
        return (string)$this->id;
    }

    /**
     * @return Collection|ProductUrl[]
     */
    public function getProductUrls(): Collection
    {
        return $this->productUrls;
    }

    public function addProductUrl(ProductUrl $productUrl): self
    {
        if (!$this->productUrls->contains($productUrl)) {
            $this->productUrls[] = $productUrl;
            $productUrl->setEntity($this);
        }

        return $this;
    }

    public function removeProductUrl(ProductUrl $productUrl): self
    {
        if ($this->productUrls->contains($productUrl)) {
            $this->productUrls->removeElement($productUrl);
            // set the owning side to null (unless already changed)
            if ($productUrl->getEntity() === $this) {
                $productUrl->setEntity(null);
            }
        }

        return $this;
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
            $productTag->addEntityId($this);
        }

        return $this;
    }

    public function removeProductTag(ProductTag $productTag): self
    {
        if ($this->productTags->contains($productTag)) {
            $this->productTags->removeElement($productTag);
            $productTag->removeEntityId($this);
        }

        return $this;
    }

    /**
     * @return Collection|ProductTagItem[]
     */
    public function getProducttagitem(): Collection
    {
        return $this->producttagitem;
    }

    public function addProducttagitem(ProductTagItem $producttagitem): self
    {
        if (!$this->producttagitem->contains($producttagitem)) {
            $this->producttagitem[] = $producttagitem;
        }

        return $this;
    }

    public function removeProducttagitem(ProductTagItem $producttagitem): self
    {
        if ($this->producttagitem->contains($producttagitem)) {
            $this->producttagitem->removeElement($producttagitem);
        }

        return $this;
    }

    public function setTagsArray(array $tags)
    {
        $this->tagsArray = $tags;
    }

    public function getTagsArray()
    {
        return $this->tagsArray;
    }

    public function setAllTagsArray(array $tags)
    {
        $this->allTagsArray = $tags;
    }

    public function getAllTagsArray()
    {
        return $this->allTagsArray;
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
            $sale->addProduct($this);
        }

        return $this;
    }

    public function removeSale(Sale $sale): self
    {
        if ($this->sales->contains($sale)) {
            $this->sales->removeElement($sale);
            $sale->removeProduct($this);
        }

        return $this;
    }

    /**
     * @return Collection|Catalog[]
     */
    public function getCatalog(): Collection
    {
        return $this->catalog;
    }

    public function addCatalog(Catalog $catalog): self
    {
        if (!$this->catalog->contains($catalog)) {
            $this->catalog[] = $catalog;
        }

        return $this;
    }

    public function removeCatalog(Catalog $catalog): self
    {
        if ($this->catalog->contains($catalog)) {
            $this->catalog->removeElement($catalog);
        }

        return $this;
    }

    /**
     * @return Collection|ProductItem[]
     */
    public function getProductItems(): Collection
    {
        return $this->productItems;
    }

    public function addProductItem(ProductItem $productItem): self
    {
        if (!$this->productItems->contains($productItem)) {
            $this->productItems[] = $productItem;
            $productItem->setProduct($this);
        }

        return $this;
    }

    public function removeProductItem(ProductItem $productItem): self
    {
        if ($this->productItems->contains($productItem)) {
            $this->productItems->removeElement($productItem);
            // set the owning side to null (unless already changed)
            if ($productItem->getProduct() === $this) {
                $productItem->setProduct(null);
            }
        }

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

    public function getSku(): ?string
    {
        return $this->sku;
    }

    public function setSku(?string $sku): self
    {
        $this->sku = $sku;

        return $this;
    }
}
