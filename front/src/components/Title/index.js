import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const Title = ({ children }) => <div className={styles.root}>{children}</div>;

Title.defaultProps = {};

Title.propTypes = {};

export default Title;
