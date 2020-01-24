import gql from 'graphql-tag';

const SEARCH_PRODUCTS = gql`
    query Search($query: String!) {
        catalog_search(name: $query) {
            products(limit: 100500, offset: 0) {
                edges {
                    node {
                        id
                        name
                        url
                        items(limit: 40, offset: 0) {
                            edges {
                                node {
                                    id
                                    images
                                    name
                                    price
                                    productItemTagItems {
                                        id
                                        name
                                        image
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default SEARCH_PRODUCTS;
