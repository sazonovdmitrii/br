import gql from 'graphql-tag';

const GET_CATALOG = gql`
    query Catalog($slug: String!) {
        catalog(slug: $slug) {
            name
            banner
            description
        }
    }
`;

export default GET_CATALOG;
