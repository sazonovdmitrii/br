import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { isBrowser } from 'utils';

import styles from './styles.css';

const SnackbarOverlay = ({ children }) => {
    if (isBrowser) {
        const domNode = document.body;

        if (domNode) {
            return createPortal(<div className={styles.overlay}>{children}</div>, domNode);
        }
    }

    return null;
};

SnackbarOverlay.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SnackbarOverlay;
