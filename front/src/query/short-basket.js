import gql from 'graphql-tag';

const GET_SHORT_BASKET = gql`
    {
        basket {
            products {
                name
            }
        }
    }
`;

export default GET_SHORT_BASKET;
