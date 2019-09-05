import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const cx = classnames.bind(styles);

const FooterMenu = ({ className, items, name }) => {
    const rootClassName = cx(styles.root, className);

    return (
        <nav className={rootClassName}>
            {items.map((item, index) => (
                <div key={index} className={styles.menu}>
                    <h4 className={styles.title}>{item.name}</h4>
                    <ul className={styles.list}>
                        {item.childrens.map((child, childIndex) => (
                            <li key={childIndex} className={styles.item}>
                                <Link className={styles.link} to={child.url}>
                                    {child.name}
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
