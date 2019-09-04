import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_HEADER_MENU } from 'query';

import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';

const isClient = typeof window !== 'undefined';

export default ({ active }) => {
    const {
        data: { lang },
    } = useQuery(
        gql`
            {
                lang @client
            }
        `
    );

    console.log(lang, '🤡');
    const [isDesktop, setDesktop] = useState(isClient ? window.innerWidth > 768 : true);

    if (isClient) {
        window.matchMedia('(max-width: 768px)').addListener(() => {
            setDesktop(window.innerWidth > 768);
        });
    }

    const {
        loading,
        error,
        data: { top_menu: topMenu },
    } = useQuery(GET_HEADER_MENU, { variables: { locale: lang } });

    if (loading || error) return null;

    return isDesktop ? (
        <HeaderMenu active={active} items={topMenu.data} />
    ) : (
        <MobileMenu active={active} items={topMenu.data} />
    );
};
