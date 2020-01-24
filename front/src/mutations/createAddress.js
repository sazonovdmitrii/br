import gql from 'graphql-tag';

import { Address } from 'fragments';

const CREATE_ADDRESS_MUTATION = gql`
    mutation createAddress($input: CreateAddressInput!) {
        createAddress(input: $input) {
            ...Address
        }
    }
    ${Address}
`;

export default CREATE_ADDRESS_MUTATION;
