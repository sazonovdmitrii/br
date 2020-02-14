<?php
namespace App\Service\Twig;

/**
 * Class Helper
 *
 * @package App\Service\Twig
 */
class Helper
{
    /**
     * @param $entity
     * @param $key
     * @return mixed
     */
    public function value($entity, $key)
    {
        $method = 'get' . implode('', array_map(function($part) {
                return ucfirst($part);
            }, explode('_', $key))
        );
        return $entity->$method();
    }
}