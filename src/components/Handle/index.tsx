import React from 'react';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import cls from './Handle.module.scss';

export const Handle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={clsx(cls.root, className)}>
        <div className={cls.handle} {...props} ref={ref}>
            <DragHandleDots2Icon width={15} />
        </div>
    </div>
));

Handle.displayName = 'Handle';
