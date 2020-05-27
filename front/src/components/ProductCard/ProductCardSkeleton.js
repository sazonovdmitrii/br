import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

const ProductCardSkeleton = ({ width, height, speed }) => (
    <ContentLoader
        speed={speed}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="24" y="0" rx="0" ry="0" width="360" height="180" />
        <rect x="35%" y="204" rx="0" ry="0" width="30%" height="25" />
        <circle cx="45%" cy="250" r="15" />
        <circle cx="55%" cy="250" r="15" />
    </ContentLoader>
);

ProductCardSkeleton.defaultProps = {
    width: 408,
    height: 280,
    speed: 0,
};

ProductCardSkeleton.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    speed: PropTypes.number,
};

export default ProductCardSkeleton;
