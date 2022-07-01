import React from 'react';
import { MenuAlt4Icon } from '@heroicons/react/solid';
import clsx from 'clsx';
import cls from './Handle.module.scss';

export const Handle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={clsx(cls.root, className)}>
        <div className={cls.handle} {...props} ref={ref}>
            <MenuAlt4Icon width={15} />
        </div>
    </div>
));

Handle.displayName = 'Handle';
