<?php
namespace App\Tests;

/**
 * Trait MutationQueryData
 *
 * @package App\Tests
 */
trait MutationQueryData
{
    private function authQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: UserInput!) {
                auth(input: $input) {
                    id,
                    hash
                }
            }
GRAPHQL;
    }

    private function addBasketQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: AddBasketInput!) {
              addBasket(input: $input) {
                products {      
                  qty
                  price
                  name
                  item{
                    id
                  }
                  url
                  lense {        
                    name
                    price
                    options {
                      name
                      value
                    }        
                    recipes {
                      sides {
                        left {
                          name
                          value
                        }
                        right {
                          name
                          value
                        }            
                      }
                      extraData {
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
GRAPHQL;
    }

    private function addRecipeQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: NewRecipeInput!) {
                addRecipe(input:$input){
                    id
                    recipe
                }
            }
GRAPHQL;
    }

    private function couponQuery()
    {
        return
<<<'GRAPHQL'
            mutation($input:CouponInput!){
              applyCoupon(input: $input) {
                products {
                  name
                  qty
                  price
                  coupon_price
                }
              }
            }
GRAPHQL;
    }

    private function changePasswordQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: ChangePasswordInput!){
              changePassword(input: $input){
                id
                email
              }
            }
GRAPHQL;
    }

    private function restoreQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: RestoreInput!){
              restore(input: $input){
                message
                success
              }
            }
GRAPHQL;
    }

    private function createAddressQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: CreateAddressInput!) {
              createAddress(input: $input) {
                id
                name    
                user_id {
                  id
                }
              }
            }
GRAPHQL;
    }

    private function deleteRecipeQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: EntityIdInput!) {
              deleteRecipe(input:$input){
                id
                recipe
              }
            }
GRAPHQL;
    }

    private function isTokenValidQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: TokenInput!){
              isTokenValid(input: $input){
                message
                success
              }
            }
GRAPHQL;
    }

    private function createOrderQuery()
    {
        return
<<<'GRAPHQL'
            mutation createOrder($input: OrderInput) {
                order(input: $input) {
                    id
                    secret_key
                }
            }
GRAPHQL;
    }

    private function registerQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: RegisterInput!) {
              register(input: $input) {
                id,
                email
              }
            }
GRAPHQL;
    }

    private function deleteAddressQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: EntityIdInput!) {
              removeAddress(input: $input) {
                success
                message
              }
            }
GRAPHQL;
    }

    private function removeBasketQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: AddBasketInput!) {
              removeBasket(input: $input) {
                products {
                  item {
                    id
                  }
                }
              }
            }
GRAPHQL;
    }

    private function updateAddressQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: UpdateAddressInput!) {
              updateAddress(input: $input){
                data{
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

    private function updateBasketQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: UpdateBasketInput!) {
              updateBasket(input: $input) {
                products {
                  item {
                      id
                  }
                  qty
                }
              }
            }            
GRAPHQL;
    }

    private function updateRecipeQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: UpdateRecipeInput!) {
              updateRecipe(input:$input){
                id
                recipe
              }
            }            
GRAPHQL;
    }

    private function updateUserQuery()
    {
        return
<<<'GRAPHQL'
            mutation ($input: UpdateUserInput!) {
              updateUser(input:$input){
                id
                email
                firstname
                lastname
              }
            }            
GRAPHQL;
    }

    public function getMutationTestQuery($type)
    {
        $method = $type . 'Query';
        return $this->$method();
    }
}