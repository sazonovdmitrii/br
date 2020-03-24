import gql from 'graphql-tag';

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($input: OrderInput!) {
        order(input: $input) {
            id
            secret_key
        }
    }
`;

export default CREATE_ORDER_MUTATION;
