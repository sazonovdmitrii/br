<?php

namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EnvService extends AbstractController
{
    public function getPublicPath()
    {
        if (isset($_ENV) && isset($_ENV['BASE_PUBLIC_URL'])) {
            return $_ENV['BASE_PUBLIC_URL'];
        }
        if (isset($_SERVER['HTTP_HOST'])) {
            return $_SERVER['HTTP_HOST'] . '/public';
        }
        return '';
    }

    public function getBasePath()
    {
        if ($projectDir = $this->getParameter('kernel.project_dir')) {
            return $projectDir;
        }
    }

}