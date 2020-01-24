import gql from 'graphql-tag';

const GET_ORDERS = gql`
    {
        users_orders {
            orders {
                id
                orderItems {
                    id
                    qty
                    item {
                        id
                        name
                        price
                    }
                }
            }
        }
    }
`;

export default GET_ORDERS;
