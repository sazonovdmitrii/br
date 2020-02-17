import gql from 'graphql-tag';

import { BasketProducts, Addresses } from 'fragments';

const GET_BASKET = gql`
    query basket($locale: String) {
        isLoggedIn @client(always: false)
        basket(locale: $locale) {
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
