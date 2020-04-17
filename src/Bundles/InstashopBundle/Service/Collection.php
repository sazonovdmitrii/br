<?php
/**
 * Разработчик: Харсеев Владимир Александрович
 * Email: vkharseev@gmail.com
 * Последнее обновление: 17.04.2020.
 */

namespace App\Bundles\InstashopBundle\Service;

/**
 * Class Collection
 *
 * @package App\Bundles\InstashopBundle\Service
 */
class Collection
{
    private const DEFAULT_ITEM_VALUE = null;
    /**
     * @var array
     */
    private $items = [];

    /**
     * Collection constructor.
     *
     * @param array $items
     */
    public function __construct(array $items = [])
    {
        $this->setItems($items);
    }

    /**
     * @param $obj
     * @param null $key
     * @return $this
     */
    public function addItem($obj, $key = null): self
    {
        if ($key === null) {
            $this->items[] = $obj;
        } else {
            $this->items[$key] = $obj;
        }
        return $this;
    }

    /**
     * @param $key
     * @return $this
     */
    public function deleteItem($key): self
    {
        if (isset($this->items[$key])) {
            unset($this->items[$key]);
        }
        return $this;
    }

    /**
     * @return array
     */
    public function keys(): array
    {
        return array_keys($this->items);
    }

    /**
     * @return int
     */
    public function count(): int
    {
        return count($this->items);
    }

    /**
     * @return bool
     */
    public function isEmpty(): bool
    {
        return $this->count() === 0;
    }

    /**
     * @param $key
     * @return bool
     */
    public function keyExists($key): bool
    {
        return isset($this->items[$key]);
    }

    /**
     * @return string
     */
    public function toJson(): string
    {
        return json_encode($this->items, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param $key
     * @return mixed|null
     */
    public function getItem($key)
    {
        return $this->items[$key] ?? self::DEFAULT_ITEM_VALUE;
    }

    /**
     * @return array
     */
    public function getItems(): array
    {
        return $this->items;
    }

    /**
     * @param array $items
     * @return $this
     */
    public function setItems(array $items = []): self
    {
        if (!empty($items)) {
            foreach ($items as $item) {
                $this->addItem($item);
            }
        }
        return $this;
    }
}