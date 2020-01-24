import gql from 'graphql-tag';

import { BasketProducts } from 'fragments';

const UPDATE_PRODUCT_MUTATION = gql`
    mutation updateProduct($input: UpdateBasketInput!) {
        updateBasket(input: $input) {
            ...BasketProducts
        }
    }
    ${BasketProducts}
`;

export default UPDATE_PRODUCT_MUTATION;
