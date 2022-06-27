import React from 'react';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import cls from './Handle.module.scss';

export const Handle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div className={clsx(cls.root, className)}>
        <div className={cls.handle} {...props}>
            <DragHandleDots2Icon />
        </div>
    </div>
);
