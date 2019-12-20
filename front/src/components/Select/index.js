import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Select = ({ items, label, value, defaultValue, onChange }) => {
    const isObject = typeof items[0] === 'object';
    const ref = useRef();
    const [openList, setList] = useState(false);
    // TODO remove parseInt
    const [selectedValue, setValue] = useState(
        defaultValue ||
            (isObject
                ? items.find(({ id }) => id === parseInt(value, 10)) || {}
                : items.find(item => item === value))
    );
    const listClassName = cx(styles.list, {
        openList,
    });
    const labelClassName = cx(styles.label, {
        activeLabel: openList || (isObject ? selectedValue.id : selectedValue),
    });
    const handleSelect = item => {
        setValue(item);
        setList(false);

        if (onChange) {
            onChange(item);
        }
    };
    useOnClickOutside(ref, () => setList(false));

    return (
        <div className={styles.wrapper} ref={ref}>
            {label && <div className={labelClassName}>{label}</div>}
            <div className={styles.inner} onClick={() => setList(!openList)}>
                <div className={styles.value}>{isObject ? selectedValue.value : selectedValue}</div>
            </div>
            <div className={listClassName}>
                {items.map(item => {
                    const itemClassName = cx(styles.item, {
                        activeItem: isObject ? item.id === selectedValue.id : item === selectedValue,
                    });

                    return (
                        <div
                            key={isObject ? item.id : item}
                            className={itemClassName}
                            onClick={() => handleSelect(item)}
                        >
                            {isObject ? item.value : item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Select.defaultProps = {
    value: {},
    items: [],
    label: null,
    onChange: null,
};

Select.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.string.isRequired,
        }),
        PropTypes.string,
    ]),
    items: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.string,
    onChange: PropTypes.func,
};

export default Select;
