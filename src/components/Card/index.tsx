import React, { ReactNode } from 'react';
import clsx from 'clsx';

import cls from './Card.module.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    left?: ReactNode;
    menu?: ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, Props>(({ className, left, menu, children, ...props }, ref) => (
    <div ref={ref} className={clsx(cls.root, className)} {...props}>
        {left ? (<div className={cls.left}>{left}</div>) : null}
        <div className={cls.content}>
            {menu ? (<div className={cls.menu}>{menu}</div>) : null}
            {children}
        </div>
    </div>
));

Card.displayName = 'Card';
