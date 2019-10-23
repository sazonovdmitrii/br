<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\ExpressionLanguage\Tests\Node\Obj;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\ORM\EntityManagerInterface;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductItemRepository")
 */
class ProductItem
{
    use ORMBehaviors\Translatable\Translatable;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", inversedBy="productItems")
     */
    private $product_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\BasketItem", mappedBy="product_item_id")
     */
    private $basketItems;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="productItems")
     */
    private $entity;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $status;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $avarda_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ImportRelation", mappedBy="entity")
     */
    private $importRelations;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $price;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\OrderItem", mappedBy="item")
     */
    private $orderItems;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="productItems")
     */
    private $product;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductItemImage", mappedBy="product_item")
     */
    private $productItemImages;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ProductItemTag", mappedBy="entity")
     */
    private $productItemTags;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ProductItemTagItem", mappedBy="item")
     */
    private $productItemTagItems;

    private $images;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $sku;

    public function __construct()
    {
        $this->product_id = new ArrayCollection();
        $this->images = new ArrayCollection();
        $this->basketItems = new ArrayCollection();
        $this->productItemImages = new ArrayCollection();
        $this->importRelations = new ArrayCollection();
        $this->orderItems = new ArrayCollection();
        $this->created = new \DateTime();
        $this->productItemTags = new ArrayCollection();
        $this->productItemTagItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Product[]
     */
    public function getProductId(): Collection
    {
        return $this->product_id;
    }

    public function addProductId(Product $productId): self
    {
        if (!$this->product_id->contains($productId)) {
            $this->product_id[] = $productId;
        }

        return $this;
    }

    public function removeProductId(Product $productId): self
    {
        if ($this->product_id->contains($productId)) {
            $this->product_id->removeElement($productId);
        }

        return $this;
    }

    public function __toString()
    {
        return (string)$this->name;
    }

    /**
     * @return Collection|BasketItem[]
     */
    public function getBasketItems(): Collection
    {
        return $this->basketItems;
    }

    public function addBasketItem(BasketItem $basketItem): self
    {
        if (!$this->basketItems->contains($basketItem)) {
            $this->basketItems[] = $basketItem;
            $basketItem->setProductItemId($this);
        }

        return $this;
    }

    public function removeBasketItem(BasketItem $basketItem): self
    {
        if ($this->basketItems->contains($basketItem)) {
            $this->basketItems->removeElement($basketItem);
            // set the owning side to null (unless already changed)
            if ($basketItem->getProductItemId() === $this) {
                $basketItem->setProductItemId(null);
            }
        }

        return $this;
    }

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(?\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    public function getEntity(): ?Product
    {
        return $this->entity;
    }

    public function setEntity(?Product $entity): self
    {
        $this->entity = $entity;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getAvardaId(): ?int
    {
        return $this->avarda_id;
    }

    public function setAvardaId(?int $avarda_id): self
    {
        $this->avarda_id = $avarda_id;

        return $this;
    }

    /**
     * @return Collection|ImportRelation[]
     */
    public function getImportRelations(): Collection
    {
        return $this->importRelations;
    }

    public function addImportRelation(ImportRelation $importRelation): self
    {
        if (!$this->importRelations->contains($importRelation)) {
            $this->importRelations[] = $importRelation;
            $importRelation->setEntity($this);
        }

        return $this;
    }

    public function removeImportRelation(ImportRelation $importRelation): self
    {
        if ($this->importRelations->contains($importRelation)) {
            $this->importRelations->removeElement($importRelation);
            // set the owning side to null (unless already changed)
            if ($importRelation->getEntity() === $this) {
                $importRelation->setEntity(null);
            }
        }

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection|OrderItem[]
     */
    public function getOrderItems(): Collection
    {
        return $this->orderItems;
    }

    public function addOrderItem(OrderItem $orderItem): self
    {
        if (!$this->orderItems->contains($orderItem)) {
            $this->orderItems[] = $orderItem;
            $orderItem->setItem($this);
        }

        return $this;
    }

    public function removeOrderItem(OrderItem $orderItem): self
    {
        if ($this->orderItems->contains($orderItem)) {
            $this->orderItems->removeElement($orderItem);
            // set the owning side to null (unless already changed)
            if ($orderItem->getItem() === $this) {
                $orderItem->setItem(null);
            }
        }

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    /**
     * @return Collection|ProductItemImage[]
     */
    public function getProductItemImages(): Collection
    {
        return $this->productItemImages;
    }

    public function addProductItemImage(ProductItemImage $productItemImage): self
    {
        if (!$this->productItemImages->contains($productItemImage)) {
            $this->productItemImages[] = $productItemImage;
            $productItemImage->setProductItem($this);
        }

        return $this;
    }

    public function removeProductItemImage(ProductItemImage $productItemImage): self
    {
        if ($this->productItemImages->contains($productItemImage)) {
            $this->productItemImages->removeElement($productItemImage);
            // set the owning side to null (unless already changed)
            if ($productItemImage->getProductItem() === $this) {
                $productItemImage->setProductItem(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ProductItemTag[]
     */
    public function getProductItemTags(): Collection
    {
        return $this->productItemTags;
    }

    public function addProductItemTag(ProductItemTag $productItemTag): self
    {
        if (!$this->productItemTags->contains($productItemTag)) {
            $this->productItemTags[] = $productItemTag;
            $productItemTag->addEntity($this);
        }

        return $this;
    }

    public function removeProductItemTag(ProductItemTag $productItemTag): self
    {
        if ($this->productItemTags->contains($productItemTag)) {
            $this->productItemTags->removeElement($productItemTag);
            $productItemTag->removeEntity($this);
        }

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
            $productItemTagItem->addItem($this);
        }

        return $this;
    }

    public function removeProductItemTagItem(ProductItemTagItem $productItemTagItem): self
    {
        if ($this->productItemTagItems->contains($productItemTagItem)) {
            $this->productItemTagItems->removeElement($productItemTagItem);
            $productItemTagItem->removeItem($this);
        }

        return $this;
    }

    public function setImages($images)
    {
        $this->images = $images;
    }

    public function getImages()
    {
        return $this->images;
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
