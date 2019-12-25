import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { X as CloseIcon } from 'react-feather';
import { useLazyQuery } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';
import { SEARCH_PRODUCTS } from 'query';

import ProductCard from 'components/ProductCard';
import Link from 'components/Link';
import Loader from 'components/Loader';

import styles from './styles.css';

const SearchForm = ({ show, onClose, title, placeholder }) => {
    const [menEyeglasses, womenEyeglasses, menSunglasses, womenSunglasses] = useLangLinks([
        '/muzhskie-opravy/',
        '/zhenskie-opravy/',
        '/muzhskie-solncezashhitnye-ochki/',
        '/zhenskie-solncezashhitnye-ochki/',
    ]);
    const [search, setSearch] = useState('');
    const [products, setProduct] = useState([]);
    const overlayNode = useRef(null);
    const [loadProducts, { called, loading, data: { catalog_search: catalogSearch } = {} }] = useLazyQuery(
        SEARCH_PRODUCTS
    );

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

    useEffect(() => {
        if (catalogSearch) {
            setProduct(catalogSearch.products.edges);
        }
    }, [catalogSearch]);

    const handleChange = ({ target: { value } }) => {
        setSearch(value);
        if (value) {
            loadProducts({ variables: { query: value } });
        } else {
            setProduct([]);
        }
    };

    const Root = (
        <div className={styles.root} ref={overlayNode}>
            <div className={styles.inner}>
                <button type="button" className={styles.closeButton} onClick={onClose}>
                    <CloseIcon className={styles.closeIcon} size="16" />
                </button>
                <div className={styles.title}>{title}</div>
                <input
                    type="text"
                    className={styles.input}
                    name="search"
                    placeholder={placeholder}
                    value={search}
                    onChange={handleChange}
                />
            </div>
            <hr className={styles.hr} />
            <div className={styles.inner}>
                {called && search ? (
                    loading ? (
                        <Loader fullHeight />
                    ) : products.length ? (
                        <div className={styles.products}>
                            {products.map(({ node: { id, name, url, items } }) => (
                                <ProductCard key={id} name={name} url={url} items={items.edges} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyText}>
                            <FormattedMessage
                                id="c_search_empty_text"
                                values={{
                                    'men-eyeglasses': msg => <Link to={menEyeglasses}>{msg}</Link>,
                                    'women-eyeglasses': msg => <Link to={womenEyeglasses}>{msg}</Link>,
                                    'men-sunglasses': msg => <Link to={menSunglasses}>{msg}</Link>,
                                    'women-sunglasses': msg => <Link to={womenSunglasses}>{msg}</Link>,
                                }}
                            />
                        </div>
                    )
                ) : null}
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
};

export default SearchForm;
