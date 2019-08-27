import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const HeadTurn = ({ children, images }) => {
    const [{ allSourcesLoaded, numSourcesLoaded, frameCount, value }, setState] = useState({
        frameCount: images.length,
        value: Math.floor(images.length / 2),
        allSourcesLoaded: false,
        numSourcesLoaded: 0,
    });
    const containerRef = useRef(null);

    const handleImgLoad = () => {
        return setState(prevState => ({
            ...prevState,
            numSourcesLoaded: prevState.numSourcesLoaded + 1,
        }));
    };

    useEffect(() => {
        if (numSourcesLoaded === frameCount) {
            setState(prevState => ({
                ...prevState,
                allSourcesLoaded: true,
            }));
        }
    }, [frameCount, numSourcesLoaded]);

    const onMouseMove = event => {
        if (!allSourcesLoaded) return;

        const elem = containerRef.current;
        const { offsetWidth } = elem;
        const elemLeft = elem.getBoundingClientRect().left;
        const widthItem = offsetWidth / (frameCount - 1);
        const ind = (event.pageX - elemLeft) / widthItem;

        const index = Math.round(ind);

        if (value !== ind) {
            if (index != null && index !== value) {
                const currValue = value < index ? value + 1 : value > index ? value - 1 : 0;

                requestAnimationFrame(function() {
                    setState(prevState => ({
                        ...prevState,
                        value: currValue,
                    }));
                });
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner} ref={containerRef} onMouseMove={onMouseMove}>
                {images.map((item, index) => {
                    const imageClassName = cx(styles.image, { active: index === value });

                    return (
                        <img
                            key={index}
                            className={imageClassName}
                            src={item}
                            onLoad={handleImgLoad}
                            alt=""
                        />
                    );
                })}
            </div>
            {children && <div className={styles.text}>{children}</div>}
        </div>
    );
};

HeadTurn.defaultProps = {
    images: [],
};

export default HeadTurn;
