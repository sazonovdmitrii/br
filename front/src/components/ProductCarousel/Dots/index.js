import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Dots = ({ amount, onClick, active }) => {
    if (!amount) return null;

    const array = useMemo(() => [...new Array(amount).keys()], [amount]);

    return (
        <div className={styles.dots}>
            {array.map(item => {
                const dotClassName = cx(styles.dot, {
                    active: active === item,
                });

                return (
                    <button
                        key={item}
                        type="button"
                        aria-label={`Slide ${item + 1}`}
                        className={dotClassName}
                        onClick={() => onClick(item)}
                    />
                );
            })}
        </div>
    );
};

Dots.defaultProps = {
    amount: 0,
    onClick: () => {},
};

Dots.propTypes = {
    amount: PropTypes.number,
    active: PropTypes.number.isRequired,
    onClick: PropTypes.func,
};

export default Dots;
