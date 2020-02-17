import gql from 'graphql-tag';

const GET_CONTENT = gql`
    query page($slug: String, $locale: String) {
        page(slug: $slug, locale: $locale) {
            title
            meta_keywords
            meta_description
            content
        }
    }
`;

export default GET_CONTENT;
