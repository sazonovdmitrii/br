import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default ({ children, size, className }) => {
    const rootClassName = cx(styles.root, className, { [size]: !!size });

    return <div className={rootClassName}>{children}</div>;
};
