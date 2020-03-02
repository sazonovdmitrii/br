import gql from 'graphql-tag';

import { Address } from 'fragments';

const GET_ORDER = gql`
    query order($hash: String, $locale: String) {
        order(secret_key: $hash, locale: $locale) {
            id
            orderItems {
                id
                item {
                    name
                    product {
                        url
                        name
                    }
                    images
                }
                qty
                price
                coupon_price
                lense {
                    name
                    price
                    options {
                        name
                        value
                    }
                    recipes {
                        sides {
                            left {
                                name
                                value
                            }
                            right {
                                name
                                value
                            }
                        }
                        extraData {
                            name
                            value
                        }
                    }
                }
            }
            payment {
                id
                title
                description
            }
            delivery {
                id
                comment
                service
                address
                schedule
                latitude
                longitude
                days
            }
            address_id {
                ...Address
            }
        }
    }
    ${Address}
`;

export default GET_ORDER;
