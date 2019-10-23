<?php
namespace App\GraphQL\Type;

class ItemsImagesType
{
    public $name = 'ItemsImages';

    public function __construct(
        EnvService $envService
    ) {
    }

    /**
     * {@inheritdoc}
     */
    public function serialize($values)
    {
        return $values;
    }

    public function parseValue($value)
    {

    }

    /**
     * @param Node $valueNode
     *
     * @return string
     */
    public function parseLiteral($valueNode, $variables = NULL)
    {

    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases()
    {
        return ['ItemsImages'];
    }
}