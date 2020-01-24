import gql from 'graphql-tag';

const GET_STORES = gql`
    query stores($vision: Int) {
        stores(check_vision: $vision) {
            data {
                id
                name
                full_name
                city
                visible
                longitude
                latitude
                storeUrls {
                    url
                }
            }
        }
    }
`;

export default GET_STORES;
