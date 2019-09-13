import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { X as CloseIcon } from 'react-feather';
import { injectIntl, intlShape } from 'react-intl';
import Input from 'components/Input';

import styles from './styles.css';

const SearchForm = ({ history, show, onClose, intl }) => {
    const placeholder = intl.formatMessage({ id: 'search' });
    const [search, setSearch] = useState('');
    const overlayNode = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();

        if (!search) return;

        history.push(`/search/?search=${search}`);
    };

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
                <div className={styles.title}>{placeholder} Brillenhof</div>
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
            <div className={styles.inner}>
                <div className="u-pt6 u-grid__row" />
            </div>
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
    history: PropTypes.object.isRequired,
};

export default injectIntl(withRouter(SearchForm));
