<?php
namespace App\Tests\Query;

use App\Tests\GraphQLTesting;

/**
 * Class BannerTest
 *
 * @package App\Tests\Mutation
 */
class BannerTest extends GraphQLTesting
{
    public function testBasket()
    {
        $banner = $this->graphqlQuery($this->getQueryTestQuery('banner'));

        $this->assertArraySubset([
            'data' => [
                'banners' => [
                    'data' => []
                ]
            ]
        ], $banner);

        $banners = $banner['data']['banners']['data'];
        $this->assertNotEmpty($banners);

        $this->assertArraySubset([
            'id',
            'bannerItems'
        ], array_keys($banners[0]));
    }
}
