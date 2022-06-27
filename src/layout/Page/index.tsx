import clsx from 'clsx';
import React from 'react';
import { Footer } from '../../features/Footer';

import cls from './Page.module.scss';

export const PageLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <div className={clsx(cls.root, className)}>
        <main className={cls.main}>
            {children}
        </main>
        <Footer className={cls.footer} />
    </div>
);
