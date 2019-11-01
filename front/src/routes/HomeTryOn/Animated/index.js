import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames/bind';

import { useInterval } from 'hooks';

import Button from 'components/Button';

import styles from './styles.css';

import mockup1000 from './mockups/1000.png';
import mockup2000 from './mockups/2000.png';
import mockup540 from './mockups/540.png';
import mockup1080 from './mockups/1080.png';
import mockup280 from './mockups/280.png';
import mockup560 from './mockups/560.png';

import slide_1_1000 from './slides/1_1000.jpg';
import slide_1_2000 from './slides/1_2000.jpg';
import slide_1_540 from './slides/1_540.jpg';
import slide_1_1080 from './slides/1_1080.jpg';
import slide_1_280 from './slides/1_280.jpg';
import slide_1_560 from './slides/1_560.jpg';

import slide_2_1000 from './slides/2_1000.jpg';
import slide_2_2000 from './slides/2_2000.jpg';
import slide_2_540 from './slides/2_540.jpg';
import slide_2_1080 from './slides/2_1080.jpg';
import slide_2_280 from './slides/2_280.jpg';
import slide_2_560 from './slides/2_560.jpg';

import slide_3_1000 from './slides/3_1000.jpg';
import slide_3_2000 from './slides/3_2000.jpg';
import slide_3_540 from './slides/3_540.jpg';
import slide_3_1080 from './slides/3_1080.jpg';
import slide_3_280 from './slides/3_280.jpg';
import slide_3_560 from './slides/3_560.jpg';

const cx = classnames.bind(styles);

const _slides = [
    {
        images: [
            {
                media: '900px',
                sizes: '1000px',
                srcSet: `${slide_1_1000} 1000w,${slide_1_2000} 2000w`,
            },
            {
                media: '600px',
                sizes: '540px',
                srcSet: `${slide_1_540} 540w,${slide_1_1080} 1080w`,
            },
            {
                media: '0px',
                sizes: '280px',
                srcSet: `${slide_1_280} 280w,${slide_1_560} 560w`,
            },
        ],
    },
    {
        images: [
            {
                media: '900px',
                sizes: '1000px',
                srcSet: `${slide_2_1000} 1000w,${slide_2_2000} 2000w`,
            },
            {
                media: '600px',
                sizes: '540px',
                srcSet: `${slide_2_540} 540w,${slide_2_1080} 1080w`,
            },
            {
                media: '0px',
                sizes: '280px',
                srcSet: `${slide_2_280} 280w,${slide_2_560} 560w`,
            },
        ],
    },
    {
        images: [
            {
                media: '900px',
                sizes: '1000px',
                srcSet: `${slide_3_1000} 1000w,${slide_3_2000} 2000w`,
            },
            {
                media: '600px',
                sizes: '540px',
                srcSet: `${slide_3_540} 540w,${slide_3_1080} 1080w`,
            },
            {
                media: '0px',
                sizes: '280px',
                srcSet: `${slide_3_280} 280w,${slide_3_560} 560w`,
            },
        ],
    },
];

const Animated = () => {
    const [slide, setSlide] = useState(0);

    useInterval(() => {
        setSlide(prevSlide => (prevSlide + 1) % _slides.length);
    }, 5000);

    return (
        <div className={styles.root}>
            <div className={styles.row}>
                <div className={styles.content}>
                    <div className={styles.contentContainer}>
                        <h3 className={styles.title}>
                            <FormattedMessage id="p_hometry_animatedsection_title" />
                        </h3>
                        <p className={styles.text}>
                            <FormattedMessage id="p_hometry_animatedsection_text" />
                        </p>
                        <Button to="/quiz?active=true" kind="simple" size="large" bold>
                            <FormattedMessage id="p_hometry_animatedsection_button" />
                            <span className={styles.buttonIcon}>
                                <svg viewBox="0 0 8 12" focusable="false">
                                    <path d="M0 10l2 2 6-6-6-6-2 2 4 4-4 4z"></path>
                                </svg>
                            </span>
                        </Button>
                    </div>
                </div>
                <div className={styles.image}>
                    <div className={styles.imageContainer}>
                        {_slides.map((item, index) => {
                            const slideClassName = cx(styles.slide, {
                                active: slide === index,
                            });

                            return (
                                <picture key={index} className={slideClassName}>
                                    {item.images.map(image => (
                                        <source
                                            media={`(min-width: ${image.media})`}
                                            srcSet={image.srcSet}
                                            sizes={image.sizes}
                                        />
                                    ))}
                                    <img
                                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                        alt=""
                                    />
                                </picture>
                            );
                        })}
                        <picture className={styles.device}>
                            <source
                                media="(min-width: 900px)"
                                srcSet={`${mockup1000} 1000w,${mockup2000} 2000w`}
                                sizes="1000px"
                            />
                            <source
                                media="(min-width: 600px)"
                                srcSet={`${mockup540} 540w,${mockup1080} 1080w`}
                                sizes="540px"
                            />
                            <source
                                media="(min-width: 0px)"
                                srcSet={`${mockup280} 280w,${mockup560} 560w`}
                                sizes="280px"
                            />
                            <img
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                alt=""
                            />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Animated;
