<?php
namespace App\Tests;

/**
 * Trait QueryData
 *
 * @package App\Tests
 */
trait QueryData
{
    private function addressesQuery()
    {
        return
<<<'GRAPHQL'
            {
                addresses {
                    data {
                        id
                          name
                          user_id {
                            id
                          }
                          region_id
                          city
                          street
                    }
                }
            }
GRAPHQL;
    }

    private function addressByIdQuery()
    {
        return
<<<'GRAPHQL'
            {
              address(id:12){
                id
                name
              }
            }
GRAPHQL;
    }

    private function basketQuery()
    {
        return
<<<'GRAPHQL'
            {
              basket {
                products {
                  qty,
                  name
                }
              }
            }
GRAPHQL;
    }

    private function bannerQuery()
    {
        return
<<<'GRAPHQL'
            {
              banners {
                data {
                  id
                  bannerItems {
                    id
                    images
                  }
                }
              }
            }
GRAPHQL;
    }

    private function blockQuery()
    {
        return
<<<'GRAPHQL'
            {
              block(id: "footer") {
                title
                name
                content
              }
            }
GRAPHQL;
    }

    private function catalogQuery()
    {
        return
<<<'GRAPHQL'
            {
              catalog(slug: "zhenskie-solncezashhitnye-ochki") {
                id
                name
                banner
                description
                count
                products(limit: 40, offset:0) {
                  edges {
                    node {
                      id
                      name
                      url
                    }
                  }
                }
                tags {
                  id
                  name
                  childrens{
                    id
                    name
                    count
                  }
                }
              }
            }
GRAPHQL;
    }

    private function catalogFilterQuery()
    {
        return
<<<'GRAPHQL'
            {
              catalog(slug: "zhenskie-solncezashhitnye-ochki", tags: [3921, 3920, 1298]) {
                id
                name
                banner
                description
                count
                products(limit: 40, offset:0) {
                  edges {
                    node {
                      id
                      name
                      url
                    }
                  }
                }
                tags {
                  id
                  name
                  childrens{
                    id
                    name
                    count
                  }
                }
              }
            }
GRAPHQL;
    }

    private function catalogSearchQuery()
    {
        return
<<<'GRAPHQL'
            {
              catalog_search(name: "Tortoise") {
                products(limit: 40, offset:0) {
                  edges {
                    node {
                      id
                      name
                      url
                      items(limit: 40, offset:0) {
                      edges {
                        node {
                          id
                          name
                          price
                          productItemImages {
                            id
                            path
                          }
                          productItemTagItems {
                            id
                            name
                            image
                          }
                          images
                        }
                      }
                    }
                    }
                  }
                }
              }
            }
GRAPHQL;
    }

    private function userByIdQuery()
    {
        return
<<<'GRAPHQL'
            {
              user {
                id
                confirmationToken
              }
            }
GRAPHQL;
    }

    private function citiesQuery()
    {
        return
<<<'GRAPHQL'
            {
              cities {
                data {
                  id,
                  latitude
                  longitude
                  description
                  visible
                  short_title
                  region {
                    id
                    title
                  }
                  fias_id,
                  kladr_id
                }
              }
            }
GRAPHQL;
    }

    private function menuQuery()
    {
        return
<<<'GRAPHQL'
            {
              menu(name:"footer"){
                data {
                    text
                  url
                  children{
                    text
                    url
                    children {
                      text
                      url
                    }
                  }
                }
              }
            }
GRAPHQL;
    }

    private function orderQuery($secretKey = 'd4707309443ba17e10295bb1706d75e7')
    {
        return '     
            {
              order(secret_key:"' . $secretKey . '") {
                id
                secret_key
                orderItems {
                  id
                  qty
                  item {
                    id
                    name
                    price
                    images
                    productItemTagItems{
                      id
                      name
                    }
                  }
                }
                payment {
                  id
                  title
                  description
                }
                delivery {
                  id
                  days
                  address
                  days
                  latitude
                  longitude
                  service
                  schedule
                  comment
                }
              }
            }
        ';
    }

    private function pageQuery()
    {
        return
<<<'GRAPHQL'
            {
              page(slug: "history") {
                title
                name
                content
                meta_keywords
                meta_description
                pageUrls{
                  id
                  url
                }
              }
            }
GRAPHQL;
    }

    private function productQuery()
    {
        return
<<<'GRAPHQL'
            {
              product(slug: "model-cm-19.htm"){
                id,
                name,
                items(limit: 40, offset:0) {
                  edges {
                    node {
                      id
                      name
                      price
                      productItemImages {
                        id
                        path
                      }
                      productItemTagItems {
                        id
                        name
                        image
                      }
                    }
                  }
                }
                catalog{
                  id
                  name
                  catalogUrls {
                    id
                    url
                  }
                }
                tags{
                  name
                  value
                }
              }
            }
GRAPHQL;
    }

    private function storeQuery()
    {
        return
<<<'GRAPHQL'
            {
              store(slug:"moscow/rizhskaya") {
                id
                name
                latitude
                visible
                full_name
                longitude
              }
            }
GRAPHQL;
    }

    private function addressQuery($id)
    {
        return '
            {
              address(id:'.$id.'){
                id
                name
              }
            }
        ';
    }

    public function getQueryTestQuery($type, $param = '')
    {
        $method = $type . 'Query';
        return $this->$method($param);
    }
}