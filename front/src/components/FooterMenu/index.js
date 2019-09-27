import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { GET_FOOTER_MENU } from 'query';

import styles from './styles.css';

const cx = classnames.bind(styles);

const FooterMenu = ({ className, lang }) => {
    const rootClassName = cx(styles.root, className);
    const { loading, error, data: { menu } = {} } = useQuery(GET_FOOTER_MENU, {
        variables: {
            locale: lang,
        },
    });

    if (loading || error || !menu) return null;

    return (
        <nav className={rootClassName}>
            {menu.data.map(({ text, children }) => (
                <div key={text} className={styles.menu}>
                    <h4 className={styles.title}>{text}</h4>
                    <ul className={styles.list}>
                        {children.map(child => (
                            <li key={child.text} className={styles.item}>
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

FooterMenu.defaultProps = {
    className: null,
};

FooterMenu.propTypes = {
    className: PropTypes.string,
    lang: PropTypes.string.isRequired,
};

export default FooterMenu;
