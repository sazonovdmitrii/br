import gql from 'graphql-tag';

const ADD_TO_BASKET = gql`
    mutation addBasket($input: AddBasketInput!) {
        addBasket(input: $input) {
            products {
                name
            }
        }
    }
`;

export default ADD_TO_BASKET;
