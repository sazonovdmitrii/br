<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrderItemRepository")
 */
class OrderItem
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProductItem", inversedBy="orderItems", cascade={"persist"})
     */
    private $item;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $qty;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Orders", inversedBy="orderItems", cascade={"persist"})
     */
    private $entity;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $lenses;

    private $lense;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=2, nullable=true)
     */
    private $coupon_price;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=2, nullable=true)
     */
    private $price;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getItem(): ?ProductItem
    {
        return $this->item;
    }

    public function setItem(?ProductItem $item): self
    {
        $this->item = $item;

        return $this;
    }

    public function getQty(): ?int
    {
        return $this->qty;
    }

    public function setQty(?int $qty): self
    {
        $this->qty = $qty;

        return $this;
    }

    public function getEntity(): ?Orders
    {
        return $this->entity;
    }

    public function setEntity(?Orders $entity): self
    {
        $this->entity = $entity;

        return $this;
    }

    public function __toString()
    {
        return self::class;
    }

    public function getLenses(): ?string
    {
        return $this->lenses;
    }

    public function setLenses(?string $lenses): self
    {
        $this->lenses = $lenses;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLense()
    {
        return $this->lense;
    }

    /**
     * @param mixed $lense
     */
    public function setLense($lense)
    {
        $this->lense = $lense;
    }

    public function getCouponPrice(): ?string
    {
        return $this->coupon_price;
    }

    public function setCouponPrice(?string $coupon_price): self
    {
        $this->coupon_price = $coupon_price;

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
}
