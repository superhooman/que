import splitbee from '@splitbee/web';
import React from 'react';

export const useBee = () => {
    React.useEffect(() => {
        splitbee.init({
            scriptUrl: '/bee.js',
            apiUrl: '/_hive',
            disableCookie: true,
        });
    }, []);
};
