import React from 'react';

export default ({ children: childrenProp, value, className }) => {
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const childProps = child.props;
        const childValue = childProps.value || childIndex;
        const active = childValue === value;

        childIndex += 1;

        return React.cloneElement(child, {
            active,
        });
    });

    return <div className={className}>{children}</div>;
};
