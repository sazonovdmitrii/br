import gql from 'graphql-tag';

const CREATE_USER_MUTATION = gql`
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            hash
        }
    }
`;

export default CREATE_USER_MUTATION;
