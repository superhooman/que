import clsx from 'clsx';
import React from 'react';

import cls from './Header.module.scss';

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div className={clsx(className, cls.root)} {...props} />
);
