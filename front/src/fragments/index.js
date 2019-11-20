import gql from 'graphql-tag';

export const Products = gql`
    fragment Products on Basket {
        products {
            item {
                id
                name
                images
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
