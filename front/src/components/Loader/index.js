import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Loader = ({ fullHeight, kind }) => {
    const wrapperClassName = cx(styles.wrapper, {
        fullHeight,
    });
    const loaderClassName = cx(styles.loader, {
        [kind]: !!kind,
    });

    return (
        <div className={wrapperClassName}>
            <div className={loaderClassName}>
                <div />
            </div>
        </div>
    );
};

Loader.defaultProps = {
    fullHeight: false,
};

Loader.propTypes = {
    fullHeight: PropTypes.bool,
};

export default Loader;
