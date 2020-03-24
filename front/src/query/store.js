import gql from 'graphql-tag';

const GET_STORE = gql`
    query store($slug: String!, $locale: String) {
        store(slug: $slug, locale: $locale) {
            name
            full_name
            longitude
            latitude
        }
    }
`;

export default GET_STORE;
