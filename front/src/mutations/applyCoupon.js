import gql from 'graphql-tag';

import { BasketProducts } from 'fragments';

const APPLY_COUPON_MUTATION = gql`
    mutation applyCoupon($input: CouponInput!) {
        applyCoupon(input: $input) {
            ...BasketProducts
        }
    }
    ${BasketProducts}
`;

export default APPLY_COUPON_MUTATION;
