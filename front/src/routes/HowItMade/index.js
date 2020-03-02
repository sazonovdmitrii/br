import React, { useRef, useState } from 'react';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useFormatMessage } from 'hooks';

import Title from 'components/Title';
import Nav from 'components/Nav';
import Button from 'components/Button';

import materialsImage from './images/materials.jpg';
import finalReviewImage from './images/final_review.jpg';

import styles from './styles.css';

const cx = classnames.bind(styles);

const NAV_HEIGHT = 66;

const HowItMade = () => {
    const [metaTitle] = useFormatMessage([{ id: 'p_how_it_made_meta_title' }]);
    const [activeCategory, setActiveCategory] = useState('design');

    const _sections = {
        design: { name: <FormattedMessage id="p_how_it_made_nav_design" />, node: useRef(null) },
        materials: { name: <FormattedMessage id="p_how_it_made_nav_materials" />, node: useRef(null) },
        production: {
            name: <FormattedMessage id="p_how_it_made_nav_production" />,
            node: useRef(null),
        },
        lenses: {
            name: <FormattedMessage id="p_how_it_made_nav_lenses" />,
            node: useRef(null),
        },
        // final_review: {
        //     name: <FormattedMessage id="p_how_it_made_nav_final_review" />,
        //     node: useRef(null),
        // },
    };

    const handleClick = value => {
        setActiveCategory(value);

        const current = _sections[value];

        if (current?.node?.current) {
            const { offsetTop } = current.node.current;

            window.scrollTo({ top: offsetTop - NAV_HEIGHT - 60, behavior: 'smooth' });
        }
    };

    const rowCenterClassName = cx(styles.row, styles.center);
    const imageContainerClassName = cx(styles.row, styles.imageContainer);
    const imageColClassName = cx(styles.col, styles.imageCol);

    const foo = [
        {
            nav: {
                name: 'p_how_it_made_nav_design',
                ref: _sections.design.node,
            },
            title: 'p_how_it_made_design_title',
            text: 'p_how_it_made_design_text',
        },
        {
            nav: {
                name: 'p_how_it_made_nav_materials',
                ref: _sections.materials.node,
            },
            title: 'p_how_it_made_materials_title',
            text: 'p_how_it_made_materials_text',
            image: materialsImage,
        },
        {
            nav: {
                name: 'p_how_it_made_nav_production',
                ref: _sections.production.node,
            },
            title: 'p_how_it_made_production_title',
            text: 'p_how_it_made_production_text',
        },
        {
            nav: {
                name: 'p_how_it_made_nav_lenses',
                ref: _sections.lenses.node,
            },
            title: 'p_how_it_made_lenses_title',
            text: 'p_how_it_made_lenses_text',
        },
        {
            title: 'p_how_it_made_final_review_title',
            text: 'p_how_it_made_final_review_text',
            image: finalReviewImage,
        },
    ];

    return (
        <div>
            <Helmet title={metaTitle}>
                {/* TODO REMOVE */}
                <meta name="robots" content="noindex" />
            </Helmet>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <Title element="h1" className={styles.heroTitle}>
                        Как изготавливаются очки Brillenhof
                    </Title>
                </div>
            </section>
            <Nav items={Object.entries(_sections)} value={activeCategory} onClick={id => handleClick(id)} />
            {foo.map(({ nav, title, text, image }, index) => (
                <section key={index} ref={nav?.ref} className={styles.section}>
                    <div className={styles.container}>
                        <div className={rowCenterClassName}>
                            <div className={styles.col}>
                                {nav && (
                                    <h2 className={styles.categoryTitle}>
                                        <FormattedMessage id={nav.name} />
                                    </h2>
                                )}
                                <Title element="h3" className={styles.sectionTitle}>
                                    <FormattedMessage id={title} />
                                </Title>
                                <p className={styles.sectionText}>
                                    <FormattedMessage id={text} values={{ br: <br /> }} />
                                </p>
                            </div>
                        </div>
                        {image && (
                            <div className={imageContainerClassName}>
                                <div className={imageColClassName}>
                                    <img src={image} alt="" />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            ))}
            {/* <section className={styles.section}>
                <div className="u-grid u-mw1440 u-m0a">
                    <div className="u-grid__row">
                        <div className="c-how-it-made__sectionColContainer u-grid__col -col-middle u-w10c u-w6c--600 u-pr u-l1c u-pr--600 u-l1c--600">
                            <picture>
                                <source
                                    media="(min-width: 600px)"
                                    srcset="https://i.warbycdn.com/v/c/assets/quality-landing-page/image/shop/0/a747f372a7.jpg"
                                />
                                <img
                                    src="https://i.warbycdn.com/v/c/assets/quality-landing-page/image/shop/1/53b164ed24.jpg"
                                    alt=""
                                />
                            </picture>
                        </div>
                        <div className="c-how-it-made__sectionColContainer u-grid__col -col-middle u-w10c u-w5c--600 u-pr u-l1c u-pr--600 u-l1c--600">
                            <Title element="h1">Find your pair</Title>
                            <div className="u-df u-flexd--c u-flexd--r--900 u-jc--c">
                                <Button link="/eyeglasses/men" kind="simple" size="large" bold>
                                    Shop Men
                                </Button>
                                <Button link="/eyeglasses/men" kind="simple" size="large" bold>
                                    Shop Women
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default HowItMade;
