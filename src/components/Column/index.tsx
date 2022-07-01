import clsx from 'clsx';
import React from 'react';

import cls from './Column.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    stretch?: boolean
}

export const Column: React.FC<Props> = ({ className, stretch, ...props }) => (
    <div className={clsx(cls.root, className, { [cls.stretch]: stretch })} {...props} />
);
