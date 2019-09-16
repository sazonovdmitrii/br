import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { GET_MENU } from 'query';

import styles from './styles.css';

const cx = classnames.bind(styles);

const FooterMenu = ({ className, lang, name }) => {
    const rootClassName = cx(styles.root, className);
    const {
        loading,
        error,
        data: { menu },
    } = useQuery(GET_MENU, {
        variables: {
            locale: lang,
            name: 'footer_menu',
        },
    });

    if (loading || error || !menu) return null;

    return (
        <nav className={rootClassName}>
            {menu.data.map((item, index) => (
                <div key={index} className={styles.menu}>
                    <h4 className={styles.title}>{item.text}</h4>
                    <ul className={styles.list}>
                        {item.children.map((child, childIndex) => (
                            <li key={childIndex} className={styles.item}>
                                <Link className={styles.link} to={child.url}>
                                    {child.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
};

FooterMenu.defaultProps = {};

FooterMenu.propTypes = {};

export default FooterMenu;
