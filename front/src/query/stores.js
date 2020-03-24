import gql from 'graphql-tag';

const Store = gql`
    fragment Store on Store {
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
`;

const GET_STORES = gql`
    query stores($locale: String) {
        stores: stores(check_vision: 0, locale: $locale) {
            data {
                ...Store
            }
        }
        storesWithVision: stores(check_vision: 1, locale: $locale) {
            data {
                ...Store
            }
        }
    }
    ${Store}
`;

export default GET_STORES;
