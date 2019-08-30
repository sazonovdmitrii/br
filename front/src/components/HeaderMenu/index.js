import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_HEADER_MENU } from 'query';

import SearchForm from 'components/SearchForm';
import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';


const isClient = typeof window !== 'undefined';

export default props => {
    const {
        data: { lang },
    } = useQuery(
        gql`
            {
                lang @client
            }
        `
    );

    const [isDesktop, setDesktop] = useState(isClient ? window.innerWidth > 768 : true);

    if (isClient) {
        window.matchMedia('(max-width: 768px)').addListener(event => {
            console.log('test');
            setDesktop(window.innerWidth > 768);
        });
    }

    const {
        loading,
        error,
        data: { top_menu },
    } = useQuery(GET_HEADER_MENU, { variables: { locale: lang } });

    if (loading) return null;

    return isDesktop ? (
        <HeaderMenu {...props} items={top_menu.data} />
    ) : (
        <MobileMenu {...props} items={top_menu.data} />
    );
};
