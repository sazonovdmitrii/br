<?php

namespace Impulze\Bundle\InterventionImageBundle;

use Intervention\Image\ImageManager as InterventionImageManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ImageManager extends InterventionImageManager
{
    public function __construct(ContainerInterface $container)
    {
        $config = $container->getParameter('intervention_image');
        parent::__construct($config);
    }
}
