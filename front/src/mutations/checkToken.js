import gql from 'graphql-tag';

const CHECK_TOKEN_MUTATION = gql`
    mutation checkToken($input: TokenInput!) {
        isTokenValid(input: $input) {
            success
            message
        }
    }
`;

export default CHECK_TOKEN_MUTATION;
