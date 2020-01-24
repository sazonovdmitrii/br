import gql from 'graphql-tag';

import { Addresses } from 'fragments';

const UPDATE_ADDRESS_MUTATION = gql`
    mutation updateAddress($input: UpdateAddressInput!) {
        updateAddress(input: $input) {
            ...Addresses
        }
    }
    ${Addresses}
`;

export default UPDATE_ADDRESS_MUTATION;
