import gql from 'graphql-tag';

const GET_ORDER = gql`
    query order($hash: String) {
        order(secret_key: $hash) {
            id
            orderItems {
                id
                qty
                item {
                    id
                    name
                    price
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
            }
            payment_method_id {
                id
                name
            }
            delivery_id {
                id
                name
            }
            courier {
                direction_title
            }
            address_id {
                zip
                city
                street
                house
                corp
                flat
            }
        }
    }
`;

export default GET_ORDER;
