<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LenseTagRepository")
 */
class LenseTag
{
    use ORMBehaviors\Translatable\Translatable;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $visible;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\LenseItemTag", mappedBy="entity", cascade={"remove"})
     */
    private $lenseItemTags;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $range_from;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $range_to;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $step;

    private $input_type;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $priority;

    public function __construct()
    {
        $this->lenseItemTags = new ArrayCollection();
        $this->created = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getVisible(): ?string
    {
        return $this->visible;
    }

    public function setVisible(?string $visible): self
    {
        $this->visible = $visible;

        return $this;
    }

    /**
     * @return Collection|LenseItemTag[]
     */
    public function getLenseItemTags(): Collection
    {
        return $this->lenseItemTags;
    }

    public function addLenseItemTag(LenseItemTag $lenseItemTag): self
    {
        if (!$this->lenseItemTags->contains($lenseItemTag)) {
            $this->lenseItemTags[] = $lenseItemTag;
            $lenseItemTag->setEntity($this);
        }

        return $this;
    }

    public function removeLenseItemTag(LenseItemTag $lenseItemTag): self
    {
        if ($this->lenseItemTags->contains($lenseItemTag)) {
            $this->lenseItemTags->removeElement($lenseItemTag);
            // set the owning side to null (unless already changed)
            if ($lenseItemTag->getEntity() === $this) {
                $lenseItemTag->setEntity(null);
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getRangeFrom(): ?string
    {
        return $this->range_from;
    }

    public function setRangeFrom(?string $range_from): self
    {
        $this->range_from = $range_from;

        return $this;
    }

    public function getRangeTo(): ?string
    {
        return $this->range_to;
    }

    public function setRangeTo(?string $range_to): self
    {
        $this->range_to = $range_to;

        return $this;
    }

    public function getStep(): ?string
    {
        return $this->step;
    }

    public function setStep(?string $step): self
    {
        $this->step = $step;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getInputType()
    {
        return $this->input_type;
    }

    /**
     * @param $input_type
     * @return $this
     */
    public function setInputType($input_type)
    {
        $this->input_type = $input_type;
        return $this;
    }

    public function getPriority(): ?int
    {
        return $this->priority;
    }

    public function setPriority(?int $priority): self
    {
        $this->priority = $priority;

        return $this;
    }
}
