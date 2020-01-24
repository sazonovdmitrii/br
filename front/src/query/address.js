import gql from 'graphql-tag';

import { Address } from 'fragments';

const GET_ADDRESS = gql`
    query getAddress($id: Int) {
        address(id: $id) {
            ...Address
        }
    }
    ${Address}
`;

export default GET_ADDRESS;
