import gql from 'graphql-tag';

import { User } from 'fragments';

const UPDATE_USER_MUTATION = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            ...User
        }
    }
    ${User}
`;

export default UPDATE_USER_MUTATION;
