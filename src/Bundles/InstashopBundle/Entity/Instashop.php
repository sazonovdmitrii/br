<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 17.04.2020.
 */

namespace App\Bundles\InstashopBundle\Entity;

use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\{Product, ProductItem, ProductItemImage};
use Knp\DoctrineBehaviors\Model\Translatable\Translatable;
use Doctrine\Common\Collections\{Collection, ArrayCollection};

/**
 * @ORM\Entity(repositoryClass="App\Bundles\InstashopBundle\Repository\InstashopRepository")
 * @ORM\Table(name="Instashop", uniqueConstraints={@ORM\UniqueConstraint(name="instagram_id_idx",columns={"instagram_id"},)})
 */
class Instashop
{
    public const RAW = 'raw';
    public const APPROVED = 'approved';
    public const REJECTED = 'rejected';
    use Translatable;

    /**
     * Instashop constructor.
     */
    public function __construct()
    {
        $this->instashopProducts = new ArrayCollection();
    }

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", inversedBy="instashop")
     */
    private $instashopProducts;
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
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    protected $hash_tag;
    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $path;
    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $coordinates;
    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     */
    protected $status;
    /**
     * @ORM\Column(type="boolean", nullable=false, options={"default" : "True"})
     */
    protected $visible;
    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    protected $clicks;
    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    protected $purchases;
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
     * @return string
     */
    public function getHashTag(): string
    {
        return $this->hash_tag;
    }

    /**
     * @param mixed $tag
     * @return $this
     */
    public function setHashTag($tag): self
    {
        $this->hash_tag = $tag;
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
     * @return array
     */
    public function getCoordinates(): array
    {
        return json_decode($this->coordinates ?: '[]', true);
    }

    /**
     * @param mixed $coordinates
     * @return $this
     */
    public function setCoordinates($coordinates): self
    {
        $this->coordinates = '[]';
        if (!empty($coordinates)) {
            if (is_string($coordinates)) {
                $coordinates = json_decode($coordinates, false);
            }
            if (is_array($coordinates) === false) {
                $coordinates = [$coordinates];
            }
            $validCoordinates = [];
            foreach ($coordinates as $coordinate) {
                foreach ($this->getInstashopProducts() as $product) {
                    /** @var Product $product */
                    if ((int)$product->getId() === (int)$coordinate->product) {
                        foreach ($product->getProductItems() as $item) {
                            /** @var ProductItem $item */
                            if ((int)$item->getId() === (int)$coordinate->item) {
                                $validCoordinates[] = $coordinate;
                            }
                        }
                    }
                }
            }
            $this->coordinates = json_encode($validCoordinates, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
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
     * @return int
     */
    public function getClicks(): int
    {
        return (int)$this->clicks;
    }

    /**
     * @param int $clicks
     * @return $this
     */
    public function setClicks(int $clicks): self
    {
        $this->clicks = $clicks;
        return $this;
    }

    /**
     * @return $this
     */
    public function addClick(): self
    {
        ++$this->clicks;
        return $this;
    }

    /**
     * @return int
     */
    public function getPurchases(): int
    {
        return (int)$this->purchases;
    }

    /**
     * @param int $purchases
     * @return $this
     */
    public function setPurchases(int $purchases): self
    {
        $this->purchases = $purchases;
        return $this;
    }

    /**
     * @return $this
     */
    public function addPurchase(): self
    {
        ++$this->purchases;
        return $this;
    }

    /**
     * @return bool
     */
    public function getVisible(): bool
    {
        return (bool)$this->visible;
    }

    /**
     * @param mixed $visible
     * @return $this
     */
    public function setVisible($visible = true): self
    {
        $this->visible = (bool)$visible;
        return $this;
    }

    /**
     * @return DateTimeInterface
     */
    public function getCreated(): DateTimeInterface
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

    /**
     * @return Collection|Product[]
     */
    public function getInstashopProducts(): Collection
    {
        return $this->instashopProducts;
    }

    /**
     * @param Product $product
     * @return $this
     */
    public function addInstashopProduct(Product $product): self
    {
        if (!$this->instashopProducts->contains($product)) {
            $this->instashopProducts[] = $product;
        }
        return $this;
    }

    /**
     * @param Product $product
     * @return $this
     */
    public function removeInstashopProduct(Product $product): self
    {
        if ($this->instashopProducts->contains($product)) {
            $this->instashopProducts->removeElement($product);
        }
        return $this;
    }

    /**
     * @return array
     */
    public function getInstashopProductsList(): array
    {
        $products = [];
        foreach ($this->instashopProducts as $product) {
            /** @var Product $product */
            if ($product->getVisible()) {
                $items = [];
                foreach ($product->getProductItems() as $item) {
                    $images = [];
                    foreach ($item->getImagesCollection() as $image) {
                        /** @var ProductItemImage $image */
                        $images[$image->getId()] = [
                            'id'    => $image->getId(),
                            'path'  => $image->getPath(),
                            'title' => $image->getTitle(),
                        ];
                    }
                    $items[$item->getId()] = [
                        'id'     => $item->getId(),
                        'title'  => $item->getSku(),
                        'price'  => $item->getPrice(),
                        'images' => $images,
                    ];
                }
                if (count($items)) {
                    $products[$product->getId()] = [
                        'id'    => $product->getId(),
                        'title' => $product->translate($product->getCurrentLocale())->getName(),
                        'sku'   => $product->getSku(),
                        'items' => $items,
                    ];
                }
            }
        }
        return $products;
    }

    /**
     * @param string $locale
     * @return mixed
     */
    public function getTitle(string $locale = 'ru')
    {
        $translation = $this->getTranslations()->get($locale) ?? new InstashopTranslation();
        return $translation->getTitle();
    }

    /**
     * @param string $locale
     * @return mixed
     */
    public function getDescription(string $locale = 'ru')
    {
        $translation = $this->getTranslations()->get($locale) ?? new InstashopTranslation();
        return $translation->getDescription();
    }

    public function getProducts(string $locale = 'ru'): array
    {
        $products = [];
        foreach ($this->getCoordinates() as $coordinate) {
            foreach ($this->getInstashopProducts() as $product) {
                /** @var Product $product */
                if ((int)$product->getId() === (int)$coordinate['product']) {
                    $products[] = [
                        'id'          => $product->getId(),
                        'price'       => $product->getMainPrice(),
                        'link'        => $product->getMainLink(),
                        'coordinates' => [
                            'x' => $coordinate['coordinates']['x'] ?? 0,
                            'y' => $coordinate['coordinates']['y'] ?? 0,
                        ],
                    ];
                }
            }
        }
        return $products;
    }
}
