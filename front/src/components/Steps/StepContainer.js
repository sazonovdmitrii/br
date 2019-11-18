import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const StepContainer = ({ stepTitle = '', title = '', description = '', children, theme = {} }) => {
    const rootClassName = cx(styles.root, theme.root);
    const headerClassName = cx(styles.header, theme.header);
    const titleClassName = cx(styles.stepTitle, theme.stepTitle);
    const stepTitleClassName = cx(styles.title, theme.title);
    const descriptionClassName = cx(styles.description, theme.description);
    const bodyClassName = cx(styles.body, theme.body);

    return (
        <div className={rootClassName}>
            <div className={headerClassName}>
                {stepTitle && <div className={titleClassName}>{stepTitle}</div>}
                {title && <div className={stepTitleClassName}>{title}</div>}
                {description && <div className={descriptionClassName}>{description}</div>}
            </div>
            <div className={bodyClassName}>{children}</div>
        </div>
    );
};

StepContainer.defaultProps = {
    stepTitle: '',
    title: '',
    description: '',
    theme: {},
};

StepContainer.propTypes = {
    children: PropTypes.node.isRequired,
    stepTitle: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    theme: PropTypes.objectOf(PropTypes.string),
};

export default StepContainer;
