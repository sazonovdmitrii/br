import gql from 'graphql-tag';

export { default as GET_ADDRESS } from './address';
export { default as GET_ADDRESSES } from './addresses';
export { default as GET_BASKET } from './basket';
export { default as GET_SHORT_BASKET } from './short-basket';
export { default as GET_CATALOG } from './catalog';
export { default as GET_CONTENT } from './content';
export { default as GET_COPYRIGHT_MENU } from './copyright-menu';
export { default as GET_DELIVERY } from './delivery';
export { default as GET_FOOTER_MENU } from './footer-menu';
export { default as GET_HEADER_MENU } from './header-menu';
export { default as GET_ORDER } from './order';
export { default as GET_ORDERS } from './orders';
export { default as GET_PICKUPS } from './pickups';
export { default as GET_PRODUCT } from './product';
export { default as GET_PRODUCTS } from './products';
export { default as GET_RECIPES } from './recipes';
export { default as GET_STORE } from './store';
export { default as GET_STORES } from './stores';
export { default as GET_USER } from './user';
export { default as SEARCH_PRODUCTS } from './search-products';

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client(always: false)
    }
`;

