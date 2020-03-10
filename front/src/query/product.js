import gql from 'graphql-tag';

const GET_PRODUCT = gql`
    query Product($slug: String!, $locale: String) {
        product(slug: $slug, locale: $locale) {
            name
            google_title
            google_description
            sku
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
            tags {
                name
                value
            }
            lenses {
                id
                name
                price
                recipes {
                    id
                    name
                    range_from
                    range_to
                    step
                }
                lenseitemstags {
                    id
                    name
                    visible
                    description
                    entity {
                        id
                        name
                        visible
                    }
                }
            }
            similars(limit: 3, offset: 0) {
                edges {
                    node {
                        id
                        name
                        url
                        items(limit: 1, offset: 0) {
                            edges {
                                node {
                                    name
                                    images
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default GET_PRODUCT;
