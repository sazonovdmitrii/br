import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_HEADER_MENU } from 'query';

import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';

const isClient = typeof window !== 'undefined';

import SearchForm from 'components/SearchForm';

export default props => {
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
    } = useQuery(GET_HEADER_MENU);

    if (loading) return null;

    return isDesktop ? (
        <HeaderMenu
            {...props}
            items={[
                { text: 'Бренды', url: '/brands/', children: [] },
                ...top_menu.data,
                { text: 'Акции', url: '/sales/', children: [] },
            ].filter(Boolean)}
        />
    ) : (
        <MobileMenu
            {...props}
            items={[
                { text: 'Бренды', url: '/brands/', children: [] },
                ...top_menu.data,
                { text: 'Акции', url: '/sales/', children: [] },
            ].filter(Boolean)}
        />
    );
};
