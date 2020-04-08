<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 06.04.2020.
 */

namespace App\Bundles\InstashopBundle\Entity;

use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Bundles\InstashopBundle\Repository\InstashopRepository")
 * @ORM\Table(name="Instashop", uniqueConstraints={@ORM\UniqueConstraint(name="instagram_id_idx",columns={"instagram_id"},)})
 */
class Instashop
{
    public const RAW = 'raw';
    public const APPROVED = 'approved';
    public const REJECTED = 'rejected';

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer", options={"default"="nextval('public.instashop_id_seq'::regclass)"})
     */
    protected $id;
    /**
     * @ORM\Column(type="integer", unique=true)
     */
    protected $instagram_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $path;
    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $description;
    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     */
    protected $status;
    /**
     * @ORM\Column(type="datetime")
     */
    protected $created;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getInstagramId(): ?int
    {
        return $this->instagram_id;
    }

    /**
     * @param mixed $InstagramId
     * @return $this
     */
    public function setInstagramId($InstagramId): self
    {
        $this->instagram_id = $InstagramId;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getPath(): ?string
    {
        return $this->path;
    }

    /**
     * @param string $path
     * @return $this
     */
    public function setPath(string $path): self
    {
        $this->path = $path;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     * @return $this
     */
    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getStatus(): ?string
    {
        return $this->status;
    }

    /**
     * @param string|null $status
     * @return $this
     */
    public function setStatus(?string $status): self
    {
        $this->status = $status;
        return $this;
    }

    /**
     * @return DateTimeInterface|null
     */
    public function getCreated(): ?DateTimeInterface
    {
        return $this->created;
    }

    /**
     * @param DateTimeInterface $created
     * @return $this
     */
    public function setCreated(DateTimeInterface $created): self
    {
        $this->created = $created;
        return $this;
    }
}
