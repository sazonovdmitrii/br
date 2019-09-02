<?php
namespace App\Service\Twig;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class Config extends AbstractController
{
    function get($path)
    {
        return $this->getParameter($path);
    }
}