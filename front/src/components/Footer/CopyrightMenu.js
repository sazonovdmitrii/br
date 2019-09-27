import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { GET_COPYRIGHT_MENU } from 'query';

import styles from './styles.css';

const CopyrightMenu = ({ lang }) => {
    const { loading, error, data: { menu } = {} } = useQuery(GET_COPYRIGHT_MENU, {
        variables: {
            locale: lang,
        },
    });

    if (loading || error || !menu) return null;

    return (
        <ul className={styles.bottomMenu}>
            {menu.data.map(({ url, text }) => (
                <li key={text} className={styles.bottomMenuItem}>
                    <Link to={url}>{text}</Link>
                </li>
            ))}
        </ul>
    );
};

CopyrightMenu.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default CopyrightMenu;
