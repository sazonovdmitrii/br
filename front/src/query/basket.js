import gql from 'graphql-tag';

import { BasketProducts, Addresses } from 'fragments';

const GET_BASKET = gql`
    query {
        isLoggedIn @client(always: false)
        basket {
            ...BasketProducts
        }
        payments_methods {
            data {
                id
                name
            }
        }
        addresses {
            ...Addresses
        }
        cities {
            data {
                id
                title
                visible
                longitude
                latitude
            }
        }
    }
    ${BasketProducts}
    ${Addresses}
`;

export default GET_BASKET;
