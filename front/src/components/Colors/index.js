import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from './styles.css';
import Color from './Color';

const cx = classnames.bind(styles);

const Colors = ({ list, onChange, value, first }) => {
    const handleClick = id => {
        if (onChange) onChange(id);
    };

    return (
        <div className={styles.list}>
            {list.map(item => {
                if (!item) return null;

                if (onChange) {
                    return (
                        <Color
                            key={item.id}
                            type="button"
                            active={item.id === value}
                            image={item.image}
                            onClick={() => handleClick(item.id)}
                        />
                    );
                }

                return <Color key={item.id} image={item.image} active={item.id === value} to={item.url} />;
            })}
        </div>
    );
};

export default Colors;
