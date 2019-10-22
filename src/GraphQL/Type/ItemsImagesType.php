<?php
namespace App\GraphQL\Type;

use GraphQL\Language\AST\Node;
use GraphQL\Type\Definition\ScalarType;
use App\Service\Image\GeneratorService;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Intervention\Image\Image;

class ItemsImagesType extends ScalarType implements AliasedInterface
{
    public $name = 'ItemsImages';

    private $imageGenerator;

    public function __construct() {
        $this->imageGenerator = new GeneratorService();
    }

    /**
     * {@inheritdoc}
     */
    public function serialize($values)
    {
        $img = Image::make('public/foo.jpg');

// resize image instance
        $img->resize(320, 240);

// save image in desired format
        $img->save('public/bar.jpg');
        die();
        $result = [];
        foreach($values as $value) {
            $result[] = [
                'path' => $this->imageGenerator->setPath($value->getPath())
                    ->setQuality(80)
                    ->setType('big')
                    ->get()
            ];
//            $result[] = $value->getPath();
        }
        return $result;
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