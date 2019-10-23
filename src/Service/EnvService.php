<?php

namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EnvService extends AbstractController
{
    public function getPublicPath()
    {
        $url = '';
        if (isset($_ENV) && isset($_ENV['BASE_URL'])) {
            $url = $_ENV['BASE_URL'];
        }
        if (isset($_SERVER['HTTP_HOST'])) {
            $url = $_SERVER['HTTP_HOST'];
        }
        return $url . '/public';
    }

    public function getBasePath()
    {
        if ($projectDir = $this->getParameter('kernel.project_dir')) {
            return $projectDir;
        }
    }

}