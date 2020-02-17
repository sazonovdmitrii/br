import gql from 'graphql-tag';

const GET_CATALOG = gql`
    query Catalog($slug: String!, $locale: String) {
        catalog(slug: $slug, locale: $locale) {
            name
            banner
            description
        }
    }
`;

export default GET_CATALOG;
