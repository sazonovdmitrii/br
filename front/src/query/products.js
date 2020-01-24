import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
    query Products($slug: String!, $offset: Int!, $limit: Int!, $tags: [Int]) {
        catalog(slug: $slug, tags: $tags) {
            name
            count
            products(limit: $limit, offset: $offset) {
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
`;

export default GET_PRODUCTS;
