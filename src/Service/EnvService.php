<?php

namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EnvService extends AbstractController
{
    public function getPublicUrl()
    {
        if (isset($_ENV) && isset($_ENV['BASE_PUBLIC_URL'])) {
            return $_ENV['BASE_PUBLIC_URL'];
        }
        if (isset($_SERVER['HTTP_HOST'])) {
            return $_SERVER['HTTP_HOST'] . '/public';
        }
        return '';
    }

    public function getBasePath($dir = '')
    {
        if ($projectDir = $this->getParameter('kernel.project_dir')) {
            if($dir)
                $projectDir .= '/' . $dir;
            return $projectDir;
        }
    }

    public function getDomain($suffix = '')
    {
        if (isset($_ENV) && isset($_ENV['DOMAIN'])) {
            return $_ENV['DOMAIN'] . $suffix;
        }
    }
}