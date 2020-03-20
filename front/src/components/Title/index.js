import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const Title = ({ dangerouslySetInnerHTML, children, className, element: Root }) => {
    const rootClassName = classnames(styles.root, className);

    return (
        <Root className={rootClassName} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
            {children}
        </Root>
    );
};

Title.defaultProps = {
    className: null,
    element: 'div',
};

Title.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    element: PropTypes.string,
};

export default Title;
