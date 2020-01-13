<?php

namespace App\Command\FeedData;

class FeedFactory
{
    private $type;
    private $configService;

    public function __construct($type, $configService)
    {
        $this->type = $type;
        $this->configService = $configService;
    }

    public function getDataProvider()
    {
        $class = __NAMESPACE__ . '\\' . ucfirst($this->type);
        return new $class($this->configService);
    }
}