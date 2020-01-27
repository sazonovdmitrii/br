import React from 'react';
import loadable from '@loadable/component';

import Loader from 'components/Loader';

const Component = loadable(() => import('./RestorePassword'), {
    fallback: <Loader fullHeight />,
});

export default Component;
