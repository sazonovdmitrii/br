import React from 'react';

import styles from './styles.css';

const _benefits = [
    {
        title: 'Free shipping',
        text: 'It’s on us, always. We offer free returns too.',
        image: 'https://i.warbycdn.com/v/c/assets/cart/image/Buy-2/0/083617ebb9.png?width=198',
        imageRetina: 'https://i.warbycdn.com/v/c/assets/cart/image/Buy-2/0/083617ebb9.png',
    },
    {
        title: 'Prescriptions',
        text: 'Add yours at checkout or send it in later. What a breeze.',
        image: 'https://i.warbycdn.com/v/c/assets/cart/image/Buy-2/0/083617ebb9.png?width=198',
        imageRetina: 'https://i.warbycdn.com/v/c/assets/cart/image/Buy-2/0/083617ebb9.png',
    },
    {
        title: 'More ways to save',
        text: 'You can pay with an FSA or HSA, or see if you can use your insurance with us',
        image: 'https://i.warbycdn.com/v/c/assets/cart/image/Buy-2/0/083617ebb9.png?width=198',
        imageRetina: 'https://i.warbycdn.com/v/c/assets/cart/image/Buy-2/0/083617ebb9.png',
    },
];

const Benefits = () => {
    return (
        <div class="u-grid">
            <div class={styles.row}>
                {_benefits.map(({ title, text, image, imageRetina }, index) => (
                    <div key={index} class={styles.col}>
                        <Benefit title={title} text={text} image={image} imageRetina={imageRetina} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Benefits;
