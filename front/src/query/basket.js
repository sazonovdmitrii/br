import gql from 'graphql-tag';

import { BasketProducts, Addresses } from 'fragments';

const GET_BASKET = gql`
    query {
        isLoggedIn @client(always: false)
        basket {
            ...BasketProducts
            coupon
        }
        addresses {
            ...Addresses
        }
    }
    ${BasketProducts}
    ${Addresses}
`;

export default GET_BASKET;
