import gql from 'graphql-tag';

const RESTORE_PASSWORD = gql`
    mutation restore($input: RestoreInput!) {
        restore(input: $input) {
            success
            message
        }
    }
`;

export default RESTORE_PASSWORD;
