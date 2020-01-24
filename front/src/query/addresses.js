import gql from 'graphql-tag';

import { Addresses } from 'fragments';

const GET_ADDRESSES = gql`
    {
        addresses {
            ...Addresses
        }
    }
    ${Addresses}
`;

export default GET_ADDRESSES;
