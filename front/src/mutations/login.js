import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
    mutation($input: UserInput!) {
        auth(input: $input) {
            hash
        }
    }
`;

export default LOGIN_MUTATION;
