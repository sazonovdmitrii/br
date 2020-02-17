import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import { DialogHeader } from 'components/Dialog';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Dialog = ({ title, children, open, onClose, classNames, fullWidth, maxWidth, closeOnClickOutside }) => {
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

    if (closeOnClickOutside) {
        useOnClickOutside(overlayNode, () => {
            onClose();
        });
    }

    const rootClassName = cx(styles.root, classNames.root);
    const innerClassName = cx(styles.inner, classNames.inner, {
        fullWidth,
        [maxWidth]: !!maxWidth,
    });

    const $Dialog = (
        <div role="dialog" className={rootClassName}>
            <div className={styles.overlay} />
            <div className={styles.container}>
                <div ref={overlayNode} className={innerClassName}>
                    <DialogHeader title={title} onClose={onClose} />
                    {children}
                </div>
            </div>
        </div>
    );

    if (domNode) return createPortal($Dialog, domNode);

    return null;
};

Dialog.defaultProps = {
    open: false,
    onClose: () => {},
    fullWidth: false,
    maxWidth: null,
    closeOnClickOutside: true,
    classNames: {},
};

Dialog.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    closeOnClickOutside: PropTypes.bool,
    classNames: PropTypes.objectOf(PropTypes.string),
};

export default Dialog;
