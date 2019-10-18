<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StoreRepository")
 */
class Store
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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $latitude;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\StoreUrl", mappedBy="entity")
     */
    private $storeUrls;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $check_vision;

    public function __construct()
    {
        $this->storeUrls = new ArrayCollection();
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

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function __call($method, $arguments)
    {
        $method = ('get' === substr($method, 0, 3) || 'set' === substr($method, 0, 3)) ? $method : 'get'. ucfirst($method);

        return $this->proxyCurrentLocaleTranslation($method, $arguments);
    }

    public function __get($name)
    {
        $method = 'get' . implode(array_map('ucfirst', explode('_', $name)));
        $arguments = [];
        return $this->proxyCurrentLocaleTranslation($method, $arguments);
    }

    /**
     * @return Collection|StoreUrl[]
     */
    public function getStoreUrls(): Collection
    {
        return $this->storeUrls;
    }

    public function addStoreUrl(StoreUrl $storeUrl): self
    {
        if (!$this->storeUrls->contains($storeUrl)) {
            $this->storeUrls[] = $storeUrl;
            $storeUrl->setEntity($this);
        }

        return $this;
    }

    public function removeStoreUrl(StoreUrl $storeUrl): self
    {
        if ($this->storeUrls->contains($storeUrl)) {
            $this->storeUrls->removeElement($storeUrl);
            // set the owning side to null (unless already changed)
            if ($storeUrl->getEntity() === $this) {
                $storeUrl->setEntity(null);
            }
        }

        return $this;
    }

    public function getCheckVision(): ?bool
    {
        return $this->check_vision;
    }

    public function setCheckVision(?bool $check_vision): self
    {
        $this->check_vision = $check_vision;

        return $this;
    }
}
