import gql from 'graphql-tag';

const BasketProducts = gql`
    fragment BasketProducts on Basket {
        products {
            name
            price
            coupon_price
            url
            item {
                id
                name
                images
            }
            lenses {
                lenses {
                    name
                    price
                    options {
                        name
                        value
                    }
                }
                recipes {
                    left {
                        name
                        value
                    }
                    right {
                        name
                        value
                    }
                }
            }
        }
    }
`;

export default BasketProducts;
