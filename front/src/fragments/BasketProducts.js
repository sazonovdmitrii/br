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
`;

export default BasketProducts;
