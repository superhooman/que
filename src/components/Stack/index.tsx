import clsx from 'clsx';
import React, { CSSProperties, HTMLAttributes } from 'react';
import cls from './Stack.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  direction?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
}

export const Stack = React.forwardRef<HTMLDivElement, Props>(
  ({ className, direction = 'row', alignItems, justifyContent, gap, ...props }, ref) => (
    <div
      className={clsx(className, cls.root)}
      style={{
        flexDirection: direction,
        alignItems,
        justifyContent,
        gap,
      }}
      {...props}
      ref={ref}
    />
  )
);

Stack.displayName = 'Stack';