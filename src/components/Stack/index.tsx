import clsx from 'clsx';
import React, { CSSProperties, HTMLAttributes } from 'react';
import cls from './Stack.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  direction?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
  grow?: CSSProperties['flexGrow'];
  fullWidth?: boolean;
  wrap?: boolean;
  equalStretch?: boolean;
}

export const Stack = React.forwardRef<HTMLDivElement, Props>(
  ({ className, direction = 'row', alignItems, justifyContent, gap, grow, style, fullWidth, wrap, equalStretch, ...props }, ref) => (
    <div
      className={clsx(className, cls.root, {
        [cls.fullWidth]: fullWidth,
        [cls.equalStretch]: equalStretch,
      })}
      style={{
        flexDirection: direction,
        alignItems,
        justifyContent,
        gap,
        flexGrow: grow,
        flexWrap: wrap ? 'wrap' : 'unset',
        ...style,
      }}
      {...props}
      ref={ref}
    />
  )
);

Stack.displayName = 'Stack';
