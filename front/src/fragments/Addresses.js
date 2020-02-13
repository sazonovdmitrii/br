import gql from 'graphql-tag';

import Address from './Address';

const Addresses = gql`
    fragment Addresses on Addresses {
        data {
            ...Address
        }
    }
    ${Address}
`;

export default Addresses;
