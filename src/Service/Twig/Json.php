<?php
namespace App\Service\Twig;

class Json
{
    public function json_decode($value)
    {
        return json_decode($value, true);
    }
}