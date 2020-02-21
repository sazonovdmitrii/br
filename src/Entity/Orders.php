<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrdersRepository")
 */
class Orders
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Delivery", inversedBy="orders")
     */
    private $delivery_id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Users", inversedBy="orders")
     */
    private $user_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Address", inversedBy="orders")
     */
    private $address_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\OrderItem", mappedBy="entity")
     */
    private $orderItems;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $comment;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Courier", inversedBy="orders")
     */
    private $courier;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Pickup", inversedBy="orders")
     */
    private $pickup;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $lenses;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $secret_key;

    /**
     * @ORM\Column(type="string", length=12, nullable=true)
     */
    private $payment_method_code;

    /**
     * @ORM\Column(type="string", length=12, nullable=true)
     */
    private $pickup_code;

    private $delivery;

    private $payment;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $external_delivery_code;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $external_payment_code;

    public function __construct()
    {
        $this->orderItems = new ArrayCollection();
        $this->created = new \DateTime('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDeliveryId(): ?Delivery
    {
        return $this->delivery_id;
    }

    public function setDeliveryId(?Delivery $delivery_id): self
    {
        $this->delivery_id = $delivery_id;

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

    public function getUserId(): ?Users
    {
        return $this->user_id;
    }

    public function setUserId(?Users $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getAddressId(): ?Address
    {
        return $this->address_id;
    }

    public function setAddressId(?Address $address_id): self
    {
        $this->address_id = $address_id;

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
            $orderItem->setEntity($this);
        }

        return $this;
    }

    public function removeOrderItem(OrderItem $orderItem): self
    {
        if ($this->orderItems->contains($orderItem)) {
            $this->orderItems->removeElement($orderItem);
            // set the owning side to null (unless already changed)
            if ($orderItem->getEntity() === $this) {
                $orderItem->setEntity(null);
            }
        }

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getCourier(): ?Courier
    {
        return $this->courier;
    }

    public function setCourier(?Courier $courier): self
    {
        $this->courier = $courier;

        return $this;
    }

    public function getPickup(): ?Pickup
    {
        return $this->pickup;
    }

    public function setPickup(?Pickup $pickup): self
    {
        $this->pickup = $pickup;

        return $this;
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

    public function __toString()
    {
        return (string)$this->getId();
    }

    public function getSecretKey(): ?string
    {
        return $this->secret_key;
    }

    public function setSecretKey(?string $secret_key): self
    {
        $this->secret_key = $secret_key;

        return $this;
    }

    public function getPaymentMethodCode(): ?string
    {
        return $this->payment_method_code;
    }

    public function setPaymentMethodCode(?string $payment_method_code): self
    {
        $this->payment_method_code = $payment_method_code;

        return $this;
    }

    public function getPickupCode(): ?string
    {
        return $this->pickup_code;
    }

    public function setPickupCode(?string $pickup_code): self
    {
        $this->pickup_code = $pickup_code;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDelivery()
    {
        return $this->delivery;
    }

    /**
     * @param mixed $delivery
     */
    public function setDelivery($delivery)
    {
        $this->delivery = $delivery;
    }

    /**
     * @return mixed
     */
    public function getPayment()
    {
        return $this->payment;
    }

    /**
     * @param mixed $payment
     */
    public function setPayment($payment)
    {
        $this->payment = $payment;
    }

    public function getExternalDeliveryCode(): ?string
    {
        return $this->external_delivery_code;
    }

    public function setExternalDeliveryCode(?string $external_delivery_code): self
    {
        $this->external_delivery_code = $external_delivery_code;

        return $this;
    }

    public function getExternalPaymentCode(): ?string
    {
        return $this->external_payment_code;
    }

    public function setExternalPaymentCode(?string $external_payment_code): self
    {
        $this->external_payment_code = $external_payment_code;

        return $this;
    }
}
