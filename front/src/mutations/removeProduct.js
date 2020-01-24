import gql from 'graphql-tag';

import { BasketProducts } from 'fragments';

const REMOVE_PRODUCT_MUTATION = gql`
    mutation removeProduct($input: AddBasketInput!) {
        removeBasket(input: $input) {
            ...BasketProducts
        }
    }
    ${BasketProducts}
`;

export default REMOVE_PRODUCT_MUTATION;
