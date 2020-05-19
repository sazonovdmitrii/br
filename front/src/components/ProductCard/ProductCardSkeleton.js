import React from 'react';
import ContentLoader from 'react-content-loader';

export default () => (
    <ContentLoader
        speed={0}
        width={408}
        height={280}
        viewBox="0 0 400 280"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="24" y="0" rx="0" ry="0" width="360" height="180" />
        <rect x="35%" y="204" rx="0" ry="0" width="30%" height="25" />
        <circle cx="45%" cy="250" r="15" />
        <circle cx="55%" cy="250" r="15" />
    </ContentLoader>
);
