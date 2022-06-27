import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { Logo } from '../../components/Logo';
import { Footer } from '../../features/Footer';
import { UserMenu } from '../../features/UserMenu';

import cls from './Landing.module.scss';

export const LandingLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <div className={clsx(cls.root, className)} {...props}>
        <nav className={cls.header}>
            <div className={cls.logo}>
                <Link href="/">
                    <a className={cls.logo}>
                        <Logo size={24} />
                    </a>
                </Link>
            </div>
            <UserMenu />
        </nav>
        <main className={cls.main}>
            {children}
        </main>
        <Footer className={cls.footer} />
    </div>
);
