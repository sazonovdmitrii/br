import gql from 'graphql-tag';

import { Address } from 'fragments';

const GET_ORDERS = gql`
    {
        user {
            orders {
                id
                secret_key
                orderItems {
                    price
                    coupon_price
                }
                payment {
                    id
                    title
                    description
                }
                delivery {
                    id
                    comment
                    service
                    address
                    schedule
                    latitude
                    longitude
                    days
                }
                address_id {
                    ...Address
                }
            }
        }
    }
    ${Address}
`;

export default GET_ORDERS;
