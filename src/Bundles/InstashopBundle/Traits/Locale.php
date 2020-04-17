<?php

namespace App\Bundles\InstashopBundle\Traits;

trait Locale
{
    /**
     * @var string
     */
    private $locale;

    /**
     * @return string
     */
    public function getLocale(): string
    {
        return $this->locale;
    }

    /**
     * @param string $locale
     * @return $this
     */
    public function setLocale(string $locale): self
    {
        $this->locale = $locale;
        return $this;
    }
}