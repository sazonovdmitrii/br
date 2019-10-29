import React, { useState, useEffect, useRef } from 'react';
import Siema from 'siema';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Carousel = ({ children, className, color, disabledClassName, navigation, perPage, loop }) => {
    const [state, setState] = useState({
        carousel: false,
        navigation: children.length <= perPage ? false : navigation,
    });
    const carouselRef = useRef(null);
    const handleClick = type => {
        state.carousel[type]();
    };

    useEffect(() => {
        if (!carouselRef.current && children.length <= perPage) return;

        const carousel = new Siema({
            selector: carouselRef.current,
            perPage,
            loop,
        });

        setState(prevState => ({
            ...prevState,
            carousel,
        }));
    }, [carouselRef, children.length, loop, perPage]);

    if (!state.navigation) return <div className={disabledClassName}>{children}</div>;

    const carouselClassName = cx(styles.carousel, {
        withNav: state.navigation,
    });

    return (
        <div className={carouselClassName}>
            <div ref={carouselRef}>{children}</div>
            {navigation && (
                <div className={styles.navigation}>
                    <div
                        className={`${styles.button} ${styles.left}`}
                        type="button"
                        onClick={() => handleClick('prev')}
                    >
                        <svg className={styles.arrow} viewBox="0 0 20 32" focusable="false">
                            <title>Previous slide</title>
                            <path d="M16.1,32l3.9-3.9L7.9,16L20,3.9L16.1,0L0,16L16.1,32z M17.1,3.9L5, 16l12.1,12.1l-1.1,1.1L2.9,16L16.1,2.9L17.1,3.9z" />
                        </svg>
                    </div>
                    <div
                        className={`${styles.button} ${styles.right}`}
                        type="button"
                        onClick={() => handleClick('next')}
                    >
                        <svg className={styles.arrow} viewBox="0 0 20 32" focusable="false">
                            <title>Next slide</title>
                            <path d="M3.9,0L0,3.9L12.1,16L0,28.1L3.9,32L20,16L3.9,0z M2.9,28.1L15, 16L2.9,3.9l1.1-1.1L17.1,16L3.9,29.1L2.9,28.1z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

Carousel.defaultProps = {
    className: null,
    navigation: true,
    loop: true,
    perPage: 1,
    color: '#000',
};

export default Carousel;
