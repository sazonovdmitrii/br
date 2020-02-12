import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { X as ClearIcon, ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'react-feather';

import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import api from './api';
import styles from './styles.css';

const cx = classnames.bind(styles);

let _SUGGESTIONS = [];
let firstRender = true;

const Autocomplete = ({ label, value: valueProp, onInputChange, onSelectValue, onResetValue }) => {
    const wrapperRef = useRef();
    const [showOptions, setShowOptions] = useState(false);
    const inputValue = useMemo(() => valueProp, [valueProp]);
    const [options, setOptions] = useState([]);

    const handleSelect = item => {
        setShowOptions(false);

        const {
            data: { fias_id, region_fias_id },
        } = _SUGGESTIONS.find(({ data: { fias_id } }) => fias_id === item.id);

        if (onSelectValue) {
            onSelectValue({ ...item, city_fias_id: fias_id, region_fias_id });
        }
    };
    const handleResetValue = () => {
        if (onResetValue) {
            onResetValue();
        }
    };
    const handleChangeInput = event => {
        const {
            target: { value },
        } = event;

        if (onInputChange) {
            onInputChange(event, value);
        }
    };

    useEffect(() => {
        firstRender = false;

        if (valueProp) {
            api.dadata(valueProp).then(({ suggestions }) => {
                _SUGGESTIONS = suggestions;

                setOptions(suggestions.map(({ value, data: { fias_id } }) => ({ value, id: fias_id })));
            });
        } else {
            setOptions([]);
        }
    }, [valueProp]);

    useOnClickOutside(wrapperRef, () => setShowOptions(false));

    const labelClassName = cx(styles.label, {
        activeLabel: inputValue || showOptions,
    });
    const toggleButtonClassName = cx(styles.button, styles.toggleButton, {
        open: showOptions,
    });
    const optionsClassName = cx(styles.options, {
        showOptions: (showOptions && options.length) || (!firstRender && !options.length && !!inputValue),
    });

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {label && <div className={labelClassName}>{label}</div>}
            <div className={styles.inner}>
                <input
                    type="text"
                    className={styles.input}
                    value={inputValue}
                    onChange={handleChangeInput}
                    onFocus={() => setShowOptions(true)}
                />
                <div className={styles.actions}>
                    {inputValue && (
                        <button type="button" className={styles.button} onClick={handleResetValue}>
                            <ClearIcon />
                        </button>
                    )}
                    {options.length ? (
                        <button
                            type="button"
                            className={toggleButtonClassName}
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            {showOptions ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </button>
                    ) : null}
                </div>
            </div>
            <div className={optionsClassName}>
                {!firstRender && !options.length && inputValue ? (
                    <div className={styles.item}>Ничего не найдено</div>
                ) : (
                    options.map(item => (
                        <div key={item.id} className={styles.item} onClick={() => handleSelect(item)}>
                            {item.value}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

Autocomplete.defaultProps = {
    value: null,
    label: null,
    onSelectValue: null,
    onInputChange: null,
    onResetValue: null,
};

Autocomplete.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    onSelectValue: PropTypes.func,
    onInputChange: PropTypes.func,
    onResetValue: PropTypes.func,
};

export default Autocomplete;
