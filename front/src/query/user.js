import gql from 'graphql-tag';

import { User } from 'fragments';

const GET_USER = gql`
    {
        user {
            ...User
        }
    }
    ${User}
`;

export default GET_USER;
