import React from 'react';
import { GET_MENU } from 'query';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import styles from './styles.css';

export default ({ lang }) => {
    const {
        loading,
        error,
        data: { menu },
    } = useQuery(GET_MENU, {
        variables: {
            locale: lang,
            name: 'copyright_menu',
        },
    });

    if (loading || error || !menu || !menu.data.length) return null;

    return (
        <ul className={styles.bottomMenu}>
            {menu.data.map((item, index) => (
                <li key={index} className={styles.bottomMenuItem}>
                    <Link to={item.url}>{item.text}</Link>
                </li>
            ))}
        </ul>
    );
};
