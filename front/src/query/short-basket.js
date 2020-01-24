import gql from 'graphql-tag';

const GET_SHORT_BASKET = gql`
    query Basket {
        basket {
            products {
                name
            }
        }
    }
`;

export default GET_SHORT_BASKET;
