<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class MenuTest
 *
 * @package App\Tests\Query
 */
class ProductTest extends GraphQLTesting
{
    public function testProduct()
    {
        $product = $this->graphqlQuery($this->getQueryTestQuery('product'));

        $this->assertArraySubset([
            'data' => [
                'product' => [
                    'items' => [
                        'edges' => []
                    ],
                    'catalog' => [

                    ],
                    'tags' => [

                    ]
                ]
            ]
        ], $product);

        $product = $product['data']['product'];
        $productItems = $product['items']['edges'];
        $productItem = $productItems[0]['node'];

        $this->assertArraySubset([
            'id',
            'name',
            'price',
            'productItemImages'
        ], array_keys($productItem));

        $catalog = $product['items']['edges'];
        $this->assertNotEmpty($catalog);

        $catalog = $catalog[0]['node'];
        $this->assertArraySubset([
            'id',
            'name',
            'price',
            'productItemImages',
            'productItemTagItems'
        ], array_keys($catalog));

        $tags = $product['tags'];
        $this->assertNotEmpty($tags);

        $this->assertArraySubset([
            'name',
            'value'
        ], array_keys($tags[0]));

        $lenses = $product['lenses'];
        $this->assertNotEmpty($lenses);

        $this->assertArraySubset([
            'id',
            'name',
            'price',
            'recipes'
        ], array_keys($lenses[0]));

        $recipes = $lenses[0]['recipes'];
        $this->assertNotEmpty($recipes);

        $this->assertArraySubset([
            'id',
            'name',
            'range_from',
            'range_to',
            'step'
        ], array_keys($recipes[0]));
    }
}
