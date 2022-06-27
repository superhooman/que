import React from 'react';

export const useDraggableCursor = (active: boolean) => {
    React.useEffect(() => {
        if (active) {
            document.body.classList.add('dragging');
        } else {
            document.body.classList.remove('dragging');
        }
    }, [active]);
};
