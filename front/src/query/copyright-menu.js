import gql from 'graphql-tag';

const GET_COPYRIGHT_MENU = gql`
    query menu($locale: String) {
        menu(name: "copyright_menu", locale: $locale) {
            data {
                text
                url
            }
        }
    }
`;

export default GET_COPYRIGHT_MENU;
