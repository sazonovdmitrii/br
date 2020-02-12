import gql from 'graphql-tag';

const GET_USER = gql`
    {
        user {
            id
            email
            gender
            firstname
            lastname
            phone
        }
    }
`;

export default GET_USER;
