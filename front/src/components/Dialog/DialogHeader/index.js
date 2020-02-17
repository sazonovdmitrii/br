import React from 'react';
import PropTypes from 'prop-types';
import { X as CloseIcon } from 'react-feather';

import { DialogTitle } from 'components/Dialog';

import styles from './styles.css';

const DialogHeader = ({ title, actions, onClose }) => (
    <div className={styles.header}>
        <DialogTitle>{title}</DialogTitle>
        <div className={styles.actions}>
            <button className={styles.closeButton} onClick={onClose}>
                <CloseIcon />
            </button>
        </div>
    </div>
);

DialogHeader.defaultProps = {};

DialogHeader.propTypes = {};

export default DialogHeader;
