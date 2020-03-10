import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { DialogHeader } from 'components/Dialog';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Dialog = ({ title, children, open, onClose, classNames }) => {
    const overlayNode = useRef(null);

    if (typeof document === 'undefined') return null;

    const domNode = document.body;
    useEffect(() => {
        if (open) {
            if (window.innerWidth !== overlayNode.current.clientWidth) {
                domNode.style.paddingRight = '15px';
            }
            domNode.style.overflow = 'hidden';
        }

        return () => {
            domNode.style = null;
        };
    }, [domNode.style, open]);

    const rootClassName = cx(styles.root, classNames.root);
    const innerClassName = cx(styles.inner, classNames.inner);

    const $Dialog = (
        <div ref={overlayNode} role="dialog" className={rootClassName}>
            <DialogHeader title={title} onClose={onClose} />
            {children}
        </div>
    );

    if (domNode) return createPortal($Dialog, domNode);

    return null;
};

Dialog.defaultProps = {
    open: false,
    onClose: () => {},
    classNames: {},
};

Dialog.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    classNames: PropTypes.objectOf(PropTypes.string),
};

export default Dialog;
