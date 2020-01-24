import gql from 'graphql-tag';

import { BasketProducts } from 'fragments';

const ADD_TO_BASKET = gql`
    mutation addBasket($input: AddBasketInput!) {
        addBasket(input: $input) {
            ...BasketProducts
        }
    }
    ${BasketProducts}
`;

export default ADD_TO_BASKET;
