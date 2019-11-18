import React from 'react';
import classnames from 'classnames/bind';

import Benefit from 'components/Benefit';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default ({ className, items = [], title }) => {
    if (!items.length) return null;

    const rootClassName = cx(styles.root, className);

    return (
        <section className={rootClassName}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.row}>
                {items.map(item => (
                    <Benefit
                        title={item.title}
                        text={item.text}
                        image={item.image}
                        imageRetina={item.imageRetina}
                    />
                ))}
            </div>
        </section>
    );
};
