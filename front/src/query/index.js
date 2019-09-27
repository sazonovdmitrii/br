import gql from 'graphql-tag';

import { MenuItem, Products, Addresses, Address } from 'fragments';

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client(always: false)
    }
`;

export const GET_CONTENT = gql`
    query page($slug: String) {
        page(slug: $slug) {
            title
            meta_keywords
            meta_description
            content
        }
    }
`;

export const GET_HEADER_MENU = gql`
    query headerMenu($locale: String) {
        menu(name: "top_menu", locale: $locale) {
            data {
                text
                url
                image
                children {
                    text
                    url
                    image
                    children {
                        text
                        url
                    }
                }
            }
        }
    }
`;

// tags {
//     id
//     name
//     childrens {
//         id
//         name
//         count
//     }
// }
export const GET_CATALOG = gql`
    query Catalog($slug: String!) {
        catalog(slug: $slug) {
            name
            banner
            description
        }
    }
`;

export const GET_PRODUCT = gql`
    query Product($slug: String!) {
        product(slug: $slug) {
            name
            id
            items(limit: 40, offset: 0) {
                edges {
                    node {
                        id
                        name
                        price
                        productItemImages {
                            id
                            path
                        }
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
            similars {
                id
                name
                url
                image
            }
        }
    }
`;

export const SEARCH_PRODUCTS = gql`
    query Search($query: String!) {
        productsByQuery(query: $query) {
            count
        }
    }
`;

export const GET_PRODUCTS = gql`
    query Products($slug: String!, $offset: Int!, $limit: Int!) {
        catalog(slug: $slug) {
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
                                    name
                                    productItemImages {
                                        id
                                        path
                                    }
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

export const GET_ADDRESSES = gql`
    {
        addresses {
            ...Addresses
        }
    }
    ${Addresses}
`;

export const GET_ADDRESS = gql`
    query getAddress($id: Int) {
        address(id: $id) {
            ...Address
        }
        regions {
            data {
                id
                title
            }
        }
    }
    ${Address}
`;

export const GET_SHORT_BASKET = gql`
    query Basket {
        basket {
            products {
                item_id
                qty
                name
                product_name
                price
                url
            }
        }
    }
`;

export const GET_BANNERS = gql`
    query Banners {
        banner {
            data {
                id
                path
                link
            }
        }
    }
`;

export const GET_SALES = gql`
    query Sales($limit: Int) {
        sale(limit: $limit) {
            data {
                id
                start
                finish
                category
                discount
                enabled
                featured
                type
                prior
            }
        }
    }
`;

export const GET_ORDERS = gql`
    {
        users_orders {
            orders {
                id
                orderItems {
                    id
                    qty
                    item {
                        id
                        name
                        price
                    }
                }
            }
        }
    }
`;

export const GET_BASKET = gql`
    query {
        isLoggedIn @client(always: false)
        basket {
            ...Products
        }
        payments_methods {
            data {
                id
                name
            }
        }
        addresses {
            ...Addresses
        }
        cities {
            data {
                id
                title
                visible
                longitude
                latitude
            }
        }
    }
    ${Products}
    ${Addresses}
`;

export const GET_DELIVERY = gql`
    query delivery($city_id: Int) {
        couriers(city_id: $city_id) {
            data {
                id
                direction_title
                price
                delivery_days
                delivery_days_source
                min_order_sum
                visible
                comment
                payments_methods {
                    id
                }
            }
        }
    }
`;

export const GET_PICKUPS = gql`
    query pickups($city_id: Int) {
        pickups(city_id: $city_id) {
            data {
                id
                direction_title
                address
                price
                latitude
                longitude
                phones
                schedule
                delivery_days
                delivery_days_source
                min_order_sum
                retail
                pvz_id
                visible
                comment
                payments_methods {
                    id
                }
            }
        }
    }
`;

export const GET_FOOTER_MENU = gql`
    query menu($locale: String) {
        menu(name: "footer_menu", locale: $locale) {
            data {
                text
                url
                children {
                    text
                    url
                }
            }
        }
    }
`;

export const GET_COPYRIGHT_MENU = gql`
    query menu($locale: String) {
        menu(name: "copyright_menu", locale: $locale) {
            data {
                text
                url
            }
        }
    }
`;
