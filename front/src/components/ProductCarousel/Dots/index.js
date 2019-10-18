import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Dots = ({ items, onClick, active }) => {
    if (!items.length) return null;

    return (
        <div className={styles.dots}>
            {items.map((item, index) => {
                const dotClassName = cx(styles.dot, {
                    active: active === index,
                });

                return (
                    <button
                        key={item.id}
                        type="button"
                        aria-label={`Slide ${index + 1}`}
                        className={dotClassName}
                        onClick={() => onClick(index)}
                    />
                );
            })}
        </div>
    );
};

Dots.defaultProps = {
    items: [],
    onClick: () => {},
};

Dots.propTypes = {
    items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    active: PropTypes.number.isRequired,
    onClick: PropTypes.func,
};

export default Dots;
