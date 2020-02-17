<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class MenuTest
 *
 * @package App\Tests\Query
 */
class PageTest extends GraphQLTesting
{
    public function testPage()
    {
        $page = $this->graphqlQuery($this->getQueryTestQuery('page'));

        $this->assertArraySubset([
            'data' => [
                'page' => []
            ]
        ], $page);

        $page = $page['data']['page'];

        $this->assertArraySubset([
            'title',
            'name',
            'content',
            'meta_keywords',
            'meta_description',
            'pageUrls'
        ], array_keys($page));

        $this->assertNotEmpty($page['pageUrls']);

        $this->assertArraySubset([
            'id',
            'url'
        ], array_keys($page['pageUrls'][0]));
    }
}
