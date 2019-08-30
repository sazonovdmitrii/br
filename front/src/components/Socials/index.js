import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames/bind';

import { GET_SOCIALS } from 'query';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Socials = ({ className }) => {
    // const { loading, error, data: { socials = [] } = {} } = useQuery(GET_SOCIALS);
    const socials = [];
    const rootClassName = cx(styles.root, className);

    if (!socials.length) return null;

    return (
        <ul className={rootClassName}>
            {socials.map(({ url, name }) => (
                <li className={styles.item}>
                    <a href={url} target="_blank" className={styles.link} rel="noopener">
                        <span>{name}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
};

Socials.defaultProps = {};

Socials.propTypes = {};

export default Socials;
