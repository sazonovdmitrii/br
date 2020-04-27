import React, { useState, useDebugValue } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Switch = ({
    checked: propChecked,
    className,
    disabled,
    isError,
    label,
    name,
    onChange,
    required,
    type,
}) => {
    const [id] = useState(`checkbox${nanoid()}`);
    const [checked, setChecked] = useState(propChecked);

    const handleChange = event => {
        if (disabled) return;

        setChecked(!checked);
        onChange(event, !checked);
    };
    const rootClassName = cx(styles.root, className, { disabled });
    const switchClassName = cx(styles.switch, {
        checked,
    });
    useDebugValue(checked ? 'checked' : 'unchecked');

    return (
        <label className={rootClassName} htmlFor={id}>
            <input
                id={id}
                type={type}
                name={name}
                className={styles.input}
                checked={checked}
                disabled={disabled}
                required={required}
                aria-invalid={isError || null}
                aria-required={required || null}
                onChange={handleChange}
            />
            <span className={switchClassName} />
            {label && <div className={styles.label}>{label}</div>}
        </label>
    );
};

Switch.defaultProps = {
    checked: false,
    className: null,
    disabled: false,
    isError: false,
    label: null,
    required: false,
    type: 'checkbox',
    onChange: () => {},
};

Switch.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    required: PropTypes.bool,
};

export default Switch;
