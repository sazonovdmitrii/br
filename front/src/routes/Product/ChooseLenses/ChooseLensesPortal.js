import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import ChooseLenses from './ChooseLenses';

export default props => {
    if (typeof document === 'undefined') return null;

    const overlayNode = useRef(null);
    const domNode = document.body;

    useEffect(() => {
        if (window.innerWidth !== overlayNode.current.clientWidth) {
            domNode.style.paddingRight = '15px';
        }
        domNode.style.overflow = 'hidden';

        return () => {
            domNode.style = null;
        };
    }, [domNode.style]);

    return createPortal(
        <div ref={overlayNode}>
            <ChooseLenses {...props} />
        </div>,
        domNode
    );
};
