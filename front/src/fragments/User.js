import gql from 'graphql-tag';

const User = gql`
    fragment User on User {
        id
        email
        gender
        firstname
        lastname
        phone
    }
`;

export default User;
