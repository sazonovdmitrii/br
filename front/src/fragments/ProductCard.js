import gql from 'graphql-tag';

import Address from './Address';

const ProductCard = gql`
    fragment ProductCard on Product {
        id
        name
        url
        items(limit: 40, offset: 0) {
            edges {
                node {
                    id
                    images
                    name
                    productItemTagItems {
                        id
                        name
                        image
                    }
                }
            }
        }
    }
`;

export default ProductCard;
