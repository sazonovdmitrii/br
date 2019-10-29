import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { X as CloseIcon } from 'react-feather';

import styles from './styles.css';

const SearchForm = ({ show, onClose, title, placeholder }) => {
    const [search, setSearch] = useState('');
    const overlayNode = useRef(null);

    if (typeof document === 'undefined') return null;
    const domNode = document.body;

    useEffect(() => {
        if (show) {
            if (window.innerWidth !== overlayNode.current.clientWidth) {
                domNode.style.paddingRight = '15px';
            }
            domNode.style.overflow = 'hidden';
        }

        return () => {
            domNode.style = null;
        };
    }, [domNode.style, show]);

    const Root = (
        <div className={styles.root} ref={overlayNode}>
            <div className={styles.inner}>
                <button className={styles.closeButton} onClick={onClose}>
                    <CloseIcon className={styles.closeIcon} size="16" />
                </button>
                <div className={styles.title}>{title}</div>
                <input
                    type="text"
                    className={styles.input}
                    name="search"
                    placeholder={placeholder}
                    value={search}
                    onChange={({ target: { value } }) => setSearch(value)}
                />
            </div>
            <hr className={styles.hr} />
            <div className={styles.inner}>{/* TODO PRODUCTS */}</div>
        </div>
    );

    if (domNode && show) return createPortal(Root, domNode);

    return null;
};

SearchForm.defaultProps = {
    show: false,
};

SearchForm.propTypes = {
    show: PropTypes.bool,
};

export default SearchForm;
