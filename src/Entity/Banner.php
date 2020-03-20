<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BannerRepository")
 */
class Banner
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
    private $show_from;

    /**
     * @ORM\Column(type="datetime")
     */
    private $show_to;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\BannerItem", mappedBy="banner")
     */
    private $bannerItems;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    public function __construct()
    {
        $this->bannerItems = new ArrayCollection();
        $this->created = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getShowFrom(): ?\DateTimeInterface
    {
        return $this->show_from;
    }

    public function setShowFrom(\DateTimeInterface $show_from): self
    {
        $this->show_from = $show_from;

        return $this;
    }

    public function getShowTo(): ?\DateTimeInterface
    {
        return $this->show_to;
    }

    public function setShowTo(?\DateTimeInterface $show_to): self
    {
        $this->show_to = $show_to;

        return $this;
    }

    /**
     * @return Collection|BannerItem[]
     */
    public function getBannerItems(): Collection
    {
        return $this->bannerItems;
    }

    public function addBannerItem(BannerItem $bannerItem): self
    {
        if (!$this->bannerItems->contains($bannerItem)) {
            $this->bannerItems[] = $bannerItem;
            $bannerItem->setBanner($this);
        }

        return $this;
    }

    public function removeBannerItem(BannerItem $bannerItem): self
    {
        if ($this->bannerItems->contains($bannerItem)) {
            $this->bannerItems->removeElement($bannerItem);
            // set the owning side to null (unless already changed)
            if ($bannerItem->getBanner() === $this) {
                $bannerItem->setBanner(null);
            }
        }

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
