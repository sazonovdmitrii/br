import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';

import styles from './styles.css';

const HeroHome = ({ actions, title, image }) => (
    <div className={styles.root}>
        <picture>
            <img className={styles.image} src={image} alt="" />
        </picture>
        <div className={styles.body}>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
            </div>
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    </div>
);

HeroHome.defaultProps = {};

HeroHome.propTypes = {};

export default HeroHome;
