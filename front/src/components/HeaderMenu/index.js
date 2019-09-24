import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_HEADER_MENU } from 'query';
import { isBrowser } from 'utils';

import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';

export default ({ lang, active, onClick }) => {
    const [isDesktop, setDesktop] = useState(isBrowser ? window.innerWidth >= 768 : true);

    if (isBrowser) {
        window.matchMedia('(max-width: 768px)').addListener(() => {
            setDesktop(window.innerWidth >= 768);
        });
    }

    const { loading, error, data: { top_menu: topMenu } = {} } = useQuery(GET_HEADER_MENU, {
        variables: { locale: lang },
    });

    if (loading || error || !topMenu) return null;

    return isDesktop ? (
        <HeaderMenu active={active} items={topMenu.data} />
    ) : (
        <MobileMenu active={active} items={topMenu.data} onClick={onClick} />
    );
};
