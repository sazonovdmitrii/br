import React from 'react';
import PropTypes from 'prop-types';
import { X as CloseIcon } from 'react-feather';

import { DialogTitle } from 'components/Dialog';

import styles from './styles.css';

const DialogHeader = ({ title, actions, onClose }) => (
    <div className={styles.header}>
        <div className={styles.title}>
            <DialogTitle>{title}</DialogTitle>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
        </button>
    </div>
);

DialogHeader.defaultProps = {};

DialogHeader.propTypes = {};

export default DialogHeader;
