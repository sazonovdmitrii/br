import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Dots from './Dots';
import styles from './styles.css';

const cx = classnames.bind(styles);

const ProductCarousel = ({ items }) => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            const itemsLength = items.length;

            switch (action.type) {
                case 'ACTIVE':
                    return {
                        active: action.active,
                    };
                case 'NEXT':
                    return {
                        active: (prevState.active + 1) % itemsLength,
                    };
                case 'PREV':
                    return {
                        active: (prevState.active - 1 + itemsLength) % itemsLength,
                    };
                default:
                    return prevState;
            }
        },
        {
            active: 0,
        }
    );

    const getChildrens = items.map((item, index) => {
        const activeBannerClassName = cx(styles.item, {
            active: state.active === index,
        });

        return (
            <div
                key={item.id} // eslint-disable-line
                className={activeBannerClassName}
            >
                <img className={styles.image} src={item.path} alt="" />
            </div>
        );
    });

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <div className={styles.items}>{getChildrens}</div>
                </div>
                <div className={styles.nav}>
                    <button
                        type="button"
                        aria-label="Previous slide"
                        className={styles.prevArrow}
                        onClick={() => dispatch({ type: 'PREV' })}
                    />
                    <button
                        type="button"
                        aria-label="Next slide"
                        className={styles.nextArrow}
                        onClick={() => dispatch({ type: 'NEXT' })}
                    />
                </div>
            </div>
            <Dots
                items={items}
                active={state.active}
                onClick={index => dispatch({ type: 'ACTIVE', active: index })}
            />
        </div>
    );
};

ProductCarousel.defaultProps = {
    items: [],
};
ProductCarousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default ProductCarousel;
