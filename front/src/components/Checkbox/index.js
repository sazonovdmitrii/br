import React, { useState, useRef, useDebugValue } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Checkbox = ({
    checked: checkedProp,
    defaultChecked,
    className,
    disabled,
    isError,
    label,
    name,
    onChange,
    required,
    type,
    readOnly,
}) => {
    const { current: isControlled } = useRef(checkedProp != null);
    const [id] = useState(`checkbox${nanoid()}`);
    const [checkedState, setCheckedState] = useState(checkedProp);
    const checked = isControlled ? checkedProp : checkedState;

    useDebugValue(checked ? 'checked' : 'unchecked');

    const handleChange = ({ target: { checked: newChecked } }) => {
        if (disabled) return;

        if (!isControlled) {
            setCheckedState(newChecked);
        }

        if (onChange) {
            onChange(event, newChecked);
        }
    };
    const rootClassName = cx(styles.root, className, { disabled });
    const checkboxClassName = cx(styles.checkbox, {
        checked,
    });

    return (
        <label className={rootClassName} htmlFor={id}>
            <input
                id={id}
                type={type}
                name={name}
                className={styles.input}
                checked={checkedProp}
                defaultChecked={defaultChecked}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                aria-invalid={isError || null}
                aria-required={required || null}
                onChange={handleChange}
            />
            <span className={checkboxClassName} />
            {label && <div className={styles.label}>{label}</div>}
        </label>
    );
};

Checkbox.defaultProps = {
    checked: false,
    className: null,
    disabled: false,
    isError: false,
    label: null,
    required: false,
    type: 'checkbox',
    onChange: () => {},
};

Checkbox.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    required: PropTypes.bool,
};

export default Checkbox;
