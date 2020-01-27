import gql from 'graphql-tag';

const CHANGE_PASSWORD_MUTATION = gql`
    mutation changePassword($input: ChangePasswordInput!) {
        changePassword(input: $input) {
            id
            email
            hash
        }
    }
`;

export default CHANGE_PASSWORD_MUTATION;
