import gql from 'graphql-tag';

export const BasketProducts = gql`
    fragment BasketProducts on Basket {
        products {
            item {
                id
                name
                images
            }
            lenses {
                lenses {
                    name
                    price
                    options {
                        name
                        value
                    }
                }
                recipes {
                    left {
                        name
                        value
                    }
                    right {
                        name
                        value
                    }
                }
            }
            price
            qty
        }
    }
`;

export const Address = gql`
    fragment Address on Address {
        id
        name
        person
        zip
        region_id
        city
        street
        house
        corp
        level
        flat
        code
    }
`;

export const Addresses = gql`
    fragment Addresses on Addresses {
        data {
            ...Address
        }
    }
    ${Address}
`;
