<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 */
class Page
{
    use ORMBehaviors\Translatable\Translatable;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $meta_keywords;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $meta_description;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $visible;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PageUrl", mappedBy="entity", cascade={"remove"})
     */
    private $pageUrls;

    public function __construct()
    {
        $this->pageUrls = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMetaKeywords(): ?string
    {
        return $this->meta_keywords;
    }

    public function setMetaKeywords(?string $meta_keywords): self
    {
        $this->meta_keywords = $meta_keywords;

        return $this;
    }

    public function getMetaDescription(): ?string
    {
        return $this->meta_description;
    }

    public function setMetaDescription(?string $meta_description): self
    {
        $this->meta_description = $meta_description;

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

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(?\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

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
     * @return Collection|PageUrl[]
     */
    public function getPageUrls(): Collection
    {
        return $this->pageUrls;
    }

    public function addPageUrl(PageUrl $pageUrl): self
    {
        if (!$this->pageUrls->contains($pageUrl)) {
            $this->pageUrls[] = $pageUrl;
            $pageUrl->setEntity($this);
        }

        return $this;
    }

    public function removePageUrl(PageUrl $pageUrl): self
    {
        if ($this->pageUrls->contains($pageUrl)) {
            $this->pageUrls->removeElement($pageUrl);
            // set the owning side to null (unless already changed)
            if ($pageUrl->getEntity() === $this) {
                $pageUrl->setEntity(null);
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
}
