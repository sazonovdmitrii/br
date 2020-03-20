import gql from 'graphql-tag';

const GET_BANNER = gql`
    query banner($name: String!, $locale: String!) {
        banner(name: $name, locale: $locale) {
            bannerItems {
                id
                images
                description
            }
        }
    }
`;

export default GET_BANNER;
