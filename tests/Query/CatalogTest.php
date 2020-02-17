<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class CatalogTest
 *
 * @package App\Tests\Mutation
 */
class CatalogTest extends GraphQLTesting
{
    public function testCatalog()
    {
        $catalog = $this->graphqlQuery($this->getQueryTestQuery('catalog'));

        $this->_testCatalog($catalog);
    }

    public function testCatalogFilter()
    {
        $catalog = $this->graphqlQuery($this->getQueryTestQuery('catalogFilter'));

        $this->_testCatalog($catalog);
    }

    public function testCatalogSearchFilter()
    {
        $catalogSearch = $this->graphqlQuery($this->getQueryTestQuery('catalogSearch'));
        $this->assertArraySubset([
            'data' => [
                'catalog_search' => [
                    'products' => [
                        'edges' => [

                        ]
                    ]
                ]
            ]
        ], $catalogSearch);
    }

    private function _testCatalog($catalog)
    {
        $this->assertArraySubset([
            'data' => [
                'catalog' => []
            ]
        ], $catalog);

        $catalog = $catalog['data']['catalog'];
        $this->assertNotEmpty($catalog);

        $this->assertArraySubset([
            'id',
            'name',
            'banner',
            'description',
            'count',
            'products',
            'tags'
        ], array_keys($catalog));

        $products = $catalog['products'];

        $this->arrayHasKey('edges', $products);

        $listing = $products['edges'];
        $this->assertNotEmpty($listing);
        $first = $listing[0];
        $this->arrayHasKey('node', $first);
        $fistItem = $first['node'];
        $this->assertArraySubset([
            'id',
            'name',
            'url'
        ], array_keys($fistItem));

        $tags = $catalog['tags'];
        $this->assertNotEmpty($tags);
        $firstTag = $tags[0];
        $this->assertArraySubset([
            'id',
            'name',
            'childrens'
        ], array_keys($firstTag));

        $firstItemTag = $firstTag['childrens'];
        $this->assertNotEmpty($firstItemTag);
        $firstItemTagData = $firstItemTag[0];
        $this->assertArraySubset([
            'id',
            'name',
            'count'
        ], array_keys($firstItemTagData));
    }
}
