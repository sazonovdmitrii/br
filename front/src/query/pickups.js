import gql from 'graphql-tag';

const GET_PICKUPS = gql`
    query pickups($city_id: Int!) {
        pickups(city_id: $city_id) {
            data {
                id
                direction_title
                address
                price
                latitude
                longitude
                phones
                schedule
                delivery_days
                delivery_days_source
                min_order_sum
                retail
                pvz_id
                visible
                comment
                payments_methods {
                    id
                }
            }
        }
    }
`;

export default GET_PICKUPS;
