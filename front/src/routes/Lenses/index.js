import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

import { useFormatMessage } from 'hooks';

import Button from 'components/Button';

import styles from './styles.css';

import heroImage from './images/hero.jpg';
import prescriptionTypesImage from './images/pt.jpg';
import prescriptionTypesDarkImage from './images/pt-dark.jpg';
import eyeglassesLensColorsImage from './images/eyeglasses-lens-colors.png';
import sunglassesLensColorsImage from './images/sunglasses-lens-colors.jpg';
import prSunglassesLensColorsImage from './images/pr-sunglasses-lens-colors.jpg';

const cx = classnames.bind(styles);

const NAV_HEIGHT = 66;

const Lenses = () => {
    const [metaTitle] = useFormatMessage([{ id: 'p_lenses_meta_title' }]);
    const _sections = {
        eyeglasses: { name: <FormattedMessage id="p_lenses_nav_eyeglasses" />, node: useRef(null) },
        sunglasses: { name: <FormattedMessage id="p_lenses_nav_sunglasses" />, node: useRef(null) },
        prescription_sunglasses: {
            name: <FormattedMessage id="p_lenses_nav_prescription_sunglasses" />,
            node: useRef(null),
        },
    };
    const [activeCategory, setActiveCategory] = useState('eyeglasses');

    const handleClick = value => {
        setActiveCategory(value);

        const current = _sections[value];

        if (current && current.node.current) {
            const { offsetTop } = current.node.current;

            window.scrollTo({ top: offsetTop - NAV_HEIGHT, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.root}>
            <Helmet title={metaTitle}>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className={styles.hero}>
                <div className={styles.heroImageContainer}>
                    <picture>
                        <img className={styles.heroImage} src={heroImage} alt="" />
                    </picture>
                </div>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>
                        <FormattedMessage id="p_lenses_title" />
                    </h1>
                    <div className={styles.heroSubtitle}>
                        <FormattedMessage id="p_lenses_subtitle" />
                    </div>
                </div>
            </div>
            <div className={styles.nav}>
                <div className={styles.navInner}>
                    {Object.entries(_sections).map(([id, { name }]) => {
                        const navLinkClassName = cx(styles.navLink, {
                            active: id === activeCategory,
                        });

                        return (
                            <button
                                key={id}
                                type="button"
                                className={navLinkClassName}
                                onClick={() => handleClick(id)}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div ref={_sections.eyeglasses.node} className={styles.category}>
                <div className={styles.container}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_prescription_types_title" />
                        </h3>
                        <img className={styles.sectionImage} src={prescriptionTypesImage} alt="" />
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Single-vision</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Most people order eyeglasses with single-vision prescriptions, meaning
                                        their lenses will correct for one field of vision (near or distance).
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Progressives</p>
                                <div className={styles.markdown}>
                                    <p>
                                        If you want to correct for both your reading and distance vision, and
                                        everything in between, progressives are for you. Your prescription is
                                        eligible if it includes an “ADD” value. (Learn more{' '}
                                        <a href="/progressives">here</a>
                                        .)
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Non-prescription frames and readers</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Select “Single-vision prescription” when adding a frame to your cart,
                                        and in checkout you’ll have the option to select lenses that have no
                                        prescription at all, or lenses that offer simple magnification (like
                                        the ones you get off the spinny rack at the pharmacy). They both come
                                        with all the same protective treatments as our prescription lenses.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Prism</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Doctors will sometimes prescribe a prism correction that’s necessary
                                        for your eyes to work together properly. Pricing for a prism
                                        correction is based on your prescription strength as well as the type
                                        of lenses you choose to purchase.
                                    </p>
                                    <p>
                                        If your prescription includes a prism correction, just chat, text,
                                        call, or email us (or come into a store) for exact pricing. Not sure?
                                        Don’t sweat it—we’ll send you an email if we see a prism correction on
                                        your prescription.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_lens_colors_title" />
                        </h3>
                        <img className={styles.sectionImage} src={eyeglassesLensColorsImage} alt="" />
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Clear</p>
                                <div className={styles.markdown}>
                                    <p>
                                        We’re talking crystal clear. If you want completely uncolored vision
                                        while wearing your frames, inside and out, go with our standard clear
                                        lenses.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Light-responsive</p>
                                <div className={styles.markdown}>
                                    <p>
                                        These lenses transition from fully clear indoors to dark grey outdoors
                                        (even on a cloudy day, because they respond to UV rays). Head{' '}
                                        <a href="/light-responsive">here</a> for details.
                                    </p>
                                    <p>
                                        <em>
                                            FYI: The animation above is for illustrative purposes only, and
                                            darkens and lightens more quickly than light-responsive lenses do.
                                        </em>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_lens_materials_title" />
                        </h3>
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Polycarbonate lenses</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Standard with any Warby Parker optical order, these are some of the
                                        most lightweight and impact-resistant lenses available.{' '}
                                    </p>
                                    <p>
                                        <em>
                                            These lenses are included in the price of any Warby Parker
                                            eyeglasses
                                        </em>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>1.67 high-index lenses</p>
                                <div className={styles.markdown}>
                                    <p>
                                        If you have a <a href="/help#lenses">strong prescription</a>, you may
                                        want to opt for 1.67 high-index lenses, which are up to 20% thinner
                                        than polycarbonate lenses with the same prescription. (You'll be able
                                        to add this option when you select the lenses for your frames.)
                                    </p>
                                    <p>
                                        <em>These lenses cost an additional $30</em>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Blue-light-filtering lenses</p>
                                <div className={styles.markdown}>
                                    <p>
                                        If you have a <a href="/help#lenses">strong prescription</a>, you may
                                        want to opt for 1.67 high-index lenses, which are up to 20% thinner
                                        than polycarbonate lenses with the same prescription. (You'll be able
                                        to add this option when you select the lenses for your frames.)
                                    </p>
                                    <p>
                                        <em>These lenses cost an additional $30</em>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>1.74 high-index lenses</p>
                                <div className={styles.markdown}>
                                    <p>
                                        These lenses, recommended for anyone with an{' '}
                                        <a href="/help#lenses">especially strong prescription</a>, are up to
                                        10% thinner than 1.67 high-index lenses with the same prescription.
                                        (We’ll reach out after you’ve placed your order if they’d be a good
                                        fit for you.)
                                    </p>
                                    <p>
                                        <em>These lenses cost an additional $130</em>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            Included with every pair at zero additional cost
                        </h3>
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Scratch-resistant coating</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Just what it sounds like! (Oh, and if any scratches appear, we’ll
                                        replace your lenses for free within a year of purchase.)
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Anti-reflective coating</p>
                                <div className={styles.markdown}>
                                    <p>
                                        This coating does double duty: It eases eye strain caused by
                                        reflections and also eliminates any glare from your lenses in photos.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Superhydrophobic coating</p>
                                <div className={styles.markdown}>
                                    <p>
                                        “Hydrophobic” describes something that does not like water. We treat
                                        our lenses with superhydrophobic coatings, which repel moisture to
                                        help prevent smudging. (Because smudges are the worst.)
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>UV protection</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Our lenses block 100% of UVA and UVB rays for superior eyeball health.
                                        (Protect those peepers.)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.banner}>
                    <h3 className={styles.bannerTitle}>Browse all our eyeglasses</h3>
                    <div className={styles.bannerActions}>
                        <Button to="/eyeglasses/men" kind="simple" size="large" bold>
                            Shop Men
                        </Button>
                        <Button to="/eyeglasses/women" kind="simple" size="large" bold>
                            Shop Women
                        </Button>
                    </div>
                </div>
            </div>
            <div ref={_sections.sunglasses.node} className={styles.category}>
                <div className={styles.container}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_lens_colors_title" />
                        </h3>
                        <img className={styles.sectionImage} src={sunglassesLensColorsImage} alt="" />
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Solid</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Our solid sun lenses come in a glorious array of colors, from blue to
                                        green to brown to grey to violet (and beyond).
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Flash Mirrored</p>
                                <div className={styles.markdown}>
                                    <p>
                                        These lenses’ mirrored surfaces cut down on the amount of light
                                        entering the eye. (Healthy.) And they keep things mysterious.
                                        (Stealthy.)
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Gradient</p>
                                <div className={styles.markdown}>
                                    <p>
                                        These lenses gradually transition from one color at the top to another
                                        color (or a lighter tint of the same color) at the bottom.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_lens_treatments_title" />
                        </h3>
                        <div className={styles.textBlockCenter}>
                            <div className={styles.markdown}>
                                <p>
                                    Our non-prescription sun lenses are crafted from CR-39, a polymer that
                                    holds color beautifully and hits that sweet spot of lightweight and
                                    durable.
                                </p>
                                <p>
                                    All of our sun lenses block 100% of UVA and UVB rays for A+ eyeball
                                    health.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_lenses_w_benefits_title" />
                        </h3>
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Scratch-resistant coating</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Just what it sounds like! (Oh, and if any scratches appear, we’ll
                                        replace your lenses for free within a year of purchase.)
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Polarization</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Light rays reflecting off pavement, snow, or water can impair your
                                        vision. The polarized filter in many of our sun lenses reduces this
                                        glare—and that filter comes securely encased in your lenses so it
                                        won’t wear off over time. (Any sunglasses marked as “including
                                        polarized lenses” come with this treatment at no additional cost.)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={_sections.prescription_sunglasses.node} className={styles.category}>
                <div className={styles.container}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_lens_colors_title" />
                        </h3>
                        <img className={styles.sectionImage} alt="" src={prSunglassesLensColorsImage} />
                        <div className={styles.textBlockCenter}>
                            <div className={styles.markdown}>
                                <p>
                                    Our prescription sun lenses come in a versatile palette of solids, from
                                    grey to green. Each pair of prescription sunglasses comes with lenses
                                    selected to complement the color of the frame. (FYI: We’re not able
                                    accommodate requests for different lens colors.)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_prescription_types_title" />
                        </h3>
                        <img className={styles.sectionImage} src={prescriptionTypesDarkImage} alt="" />
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Single-vision</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Just like our single-vision optical lenses, these will correct for one
                                        field of vision, reading or distance.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Progressives</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Sunglasses with progressive lenses will correct for both your reading
                                        and distance vision (and everything in between). How to tell if you
                                        need progressives? If you see an “ADD” value on your prescription,
                                        you’re eligible. Wahoo! Learn more here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <FormattedMessage id="p_lenses_lens_materials_title" />
                        </h3>
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Polarized polycarbonate lenses</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Standard with our prescription sunglasses, these are treated to reduce
                                        glare entering the eye and are made from one of the most lightweight
                                        and impact-resistant lens materials around.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>1.67 high-index lenses</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Those with <a href="/help#lenses">stronger prescriptions</a> can opt
                                        for 1.67 high-index lenses during checkout for lenses that are up to
                                        20% thinner than polycarbonate lenses with the same prescription.
                                    </p>
                                    <p>
                                        <em>These lenses cost an additional $120</em>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            Included with every pair at zero additional cost
                        </h3>
                        <div className={styles.textBlocks}>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>UV protection</p>
                                <div className={styles.markdown}>
                                    <p>
                                        All of our sun lenses block 100% of UVA and UVB rays for A+ eyeball
                                        health.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Scratch-resistant coating</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Just what it sounds like! (Oh, and if any scratches appear, we’ll
                                        replace your lenses for free within a year of purchase.)
                                    </p>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <p className={styles.textBlockTitle}>Polarization</p>
                                <div className={styles.markdown}>
                                    <p>
                                        Light rays reflecting off pavement, snow, or water can impair your
                                        vision. The polarized filter in our prescription sun lenses (and many
                                        of our nonprescription sun lenses) reduces this glare—and that filter
                                        comes securely encased in your lenses so it won’t wear off over time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lenses;
