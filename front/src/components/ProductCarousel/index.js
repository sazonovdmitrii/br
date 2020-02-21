import React, { useState, useEffect, useRef } from 'react';
import Siema from 'siema';
import classnames from 'classnames/bind';

import Dots from './Dots';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Carousel = ({
    children,
    className,
    color,
    disabledClassName,
    draggable,
    navigation,
    perPage,
    loop,
}) => {
    const carouselRef = useRef(null);
    const [state, setState] = useState({
        carousel: false,
        active: 0,
        navigation: children.length <= perPage ? false : navigation,
    });

    useEffect(() => {
        if (!carouselRef.current && children.length <= perPage) return;

        const carousel = new Siema({
            draggable,
            perPage,
            loop,
            selector: carouselRef.current,
            onChange() {
                handleChange(this);
            },
        });

        setState(prevState => ({
            ...prevState,
            carousel,
        }));
    }, [carouselRef, children.length, loop, perPage]);

    const handleClick = type => {
        state.carousel[type]();
    };

    const handleChange = e => {
        setState(prevState => ({ ...prevState, active: e.currentSlide }));
    };

    if (!state.navigation) return <div className={disabledClassName}>{children}</div>;

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.carousel} ref={carouselRef}>
                    {children}
                </div>
                {navigation && (
                    <div className={styles.nav}>
                        <button
                            type="button"
                            aria-label="Previous slide"
                            className={styles.prevArrow}
                            onClick={() => handleClick('prev')}
                        />
                        <button
                            type="button"
                            aria-label="Next slide"
                            className={styles.nextArrow}
                            onClick={() => handleClick('next')}
                        />
                    </div>
                )}
            </div>
            <Dots
                amount={children.length}
                active={state.active}
                onClick={index => state.carousel.goTo(index)}
            />
        </div>
    );
};

Carousel.defaultProps = {
    className: null,
    draggable: true,
    navigation: true,
    loop: true,
    perPage: 1,
    color: '#000',
};

export default Carousel;
