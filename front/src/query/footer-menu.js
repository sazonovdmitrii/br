import gql from 'graphql-tag';

const GET_FOOTER_MENU = gql`
    query menu($locale: String) {
        menu(name: "footer_menu", locale: $locale) {
            data {
                text
                url
                children {
                    text
                    url
                }
            }
        }
    }
`;

export default GET_FOOTER_MENU;
