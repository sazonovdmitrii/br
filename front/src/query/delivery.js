import gql from 'graphql-tag';

const GET_DELIVERY = gql`
    query delivery($city_id: Int) {
        couriers(city_id: $city_id) {
            data {
                id
                direction_title
                price
                delivery_days
                delivery_days_source
                min_order_sum
                visible
                comment
                payments_methods {
                    id
                }
            }
        }
    }
`;

export default GET_DELIVERY;
