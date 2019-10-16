import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

import facebookIcon from './icons/facebook.svg';
import instagramIcon from './icons/instagram.svg';
import okIcon from './icons/ok.svg';
import vkIcon from './icons/vk.svg';

const cx = classnames.bind(styles);

const socials = [
    {
        name: 'vk',
        url: 'https://vk.com/brillenhof',
        icon: vkIcon,
    },
    {
        name: 'facebook',
        url: 'https://www.facebook.com/Brillenhof-100867174671198/',
        icon: facebookIcon,
    },
    {
        name: 'instagram',
        url: 'https://www.instagram.com/brillenhof/',
        icon: instagramIcon,
    },
    {
        name: 'ok',
        url: 'https://ok.ru/group/52994139816095 ',
        icon: okIcon,
    },
];

const Socials = ({ className }) => {
    const rootClassName = cx(styles.root, className);

    if (!socials.length) return null;

    return (
        <ul className={rootClassName}>
            {socials.map(({ url, name, icon: Icon }) => (
                <li key={name} className={styles.item}>
                    <a href={url} target="_blank" className={styles.link} rel="noopener noreferrer">
                        <Icon className={styles.icon} />
                    </a>
                </li>
            ))}
        </ul>
    );
};

Socials.defaultProps = {
    className: null,
};

Socials.propTypes = {
    className: PropTypes.string,
};

export default Socials;
