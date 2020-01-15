<?php

namespace App\Command\FeedData;

class FeedFactory
{
    private $type;
    private $configService;
    private $envService;

    public function __construct($type, $configService, $envService)
    {
        $this->type = $type;
        $this->configService = $configService;
        $this->envService = $envService;
    }

    public function getDataProvider()
    {
        $class = __NAMESPACE__ . '\\' . ucfirst($this->type);
        return new $class($this->configService, $this->envService);
    }
}