import splitbee from '@splitbee/web';
import React from 'react';

export const useBee = () => {
    React.useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            return;
        }
        splitbee.init({
            scriptUrl: '/bee.js',
            apiUrl: '/_hive',
            disableCookie: true,
        });
    }, []);
};
