import gql from 'graphql-tag';

const GET_HEADER_MENU = gql`
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

export default GET_HEADER_MENU;
