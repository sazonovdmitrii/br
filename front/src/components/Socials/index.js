import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames/bind';

import { GET_SOCIALS } from 'query';

import styles from './styles.css';

import instagramIcon from './icons/instagram.svg';
import youtubeIcon from './icons/youtube.svg';
import twitterIcon from './icons/twitter.svg';
import facebookIcon from './icons/facebook.svg';

const cx = classnames.bind(styles);

const Socials = ({ className }) => {
    // const { loading, error, data: { socials = [] } = {} } = useQuery(GET_SOCIALS);
    const socials = [
        {
            name: 'facebook',
            url: '/',
            icon: facebookIcon,
        },
        {
            name: 'twitter',
            url: '/',
            icon: twitterIcon,
        },
        {
            name: 'youtube',
            url: '/',
            icon: youtubeIcon,
        },
        {
            name: 'instagram',
            url: '/',
            icon: instagramIcon,
        },
    ];

    const rootClassName = cx(styles.root, className);

    if (!socials.length) return null;

    return (
        <ul className={rootClassName}>
            {socials.map(({ url, name, icon: Icon }, index) => (
                <li key={index} className={styles.item}>
                    <a href={url} target="_blank" className={styles.link} rel="noopener">
                        <Icon className={styles.icon} />
                    </a>
                </li>
            ))}
        </ul>
    );
};

Socials.defaultProps = {};

Socials.propTypes = {};

export default Socials;
