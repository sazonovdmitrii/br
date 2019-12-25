import React from 'react';
import loadable from '@loadable/component';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Register'), {
    fallback: <Loader fullHeight />,
});

export default Component;
