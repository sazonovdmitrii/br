import gql from 'graphql-tag';

const UPDATE_USER_MUTATION = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            email
            gender
            firstname
            lastname
            phone
        }
    }
`;

export default UPDATE_USER_MUTATION;
