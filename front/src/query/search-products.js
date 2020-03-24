import gql from 'graphql-tag';

import { ProductCard } from 'fragments';

const SEARCH_PRODUCTS = gql`
    query Search($query: String!) {
        catalog_search(name: $query) {
            products(limit: 100500, offset: 0) {
                edges {
                    node {
                        ...ProductCard
                    }
                }
            }
        }
    }
    ${ProductCard}
`;

export default SEARCH_PRODUCTS;
