import gql from 'graphql-tag';

import { Addresses } from 'fragments';

const REMOVE_ADDRESS_MUTATION = gql`
    mutation removeAddress($input: RemoveAddressInput!) {
        removeAddress(input: $input) {
            ...Addresses
        }
    }
    ${Addresses}
`;

export default REMOVE_ADDRESS_MUTATION;
