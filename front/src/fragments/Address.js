import gql from 'graphql-tag';

const Address = gql`
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
        region_fias_id
        city_fias_id
    }
`;

export default Address;
