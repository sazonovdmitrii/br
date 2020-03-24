import gql from 'graphql-tag';

import { ProductCard } from 'fragments';

const GET_PRODUCTS = gql`
    query Products($slug: String!, $offset: Int!, $limit: Int!, $tags: [Int], $locale: String) {
        catalog(slug: $slug, tags: $tags, locale: $locale) {
            name
            products(limit: $limit, offset: $offset) {
                edges {
                    node {
                        ...ProductCard
                    }
                }
            }
            tags {
                id
                name
                childrens {
                    id
                    name
                    count
                }
            }
        }
    }
    ${ProductCard}
`;

export default GET_PRODUCTS;
