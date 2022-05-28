import React, { HTMLAttributes } from 'react';
import * as AvatarBase from '@radix-ui/react-avatar';
import cls from './Avatar.module.css';
import clsx from 'clsx';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  image?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const getInitials = (name: string) => name.split(' ').map((n) => n[0] || '').join('');

export const Avatar = React.forwardRef<HTMLSpanElement, Props>(
  ({ image, name = 'User', size = 'sm', className, ...props }, ref) => (
    <AvatarBase.Root
      ref={ref}
      className={clsx(className, cls.root)}
      data-size={size}
      {...props}
    >
      <AvatarBase.AvatarImage
        src={image}
        alt={name}
        className={cls.img}
      />
      <AvatarBase.AvatarFallback
        delayMs={600}
        className={cls.fallback}
      >
        {getInitials(name)}
      </AvatarBase.AvatarFallback>
    </AvatarBase.Root>
  )
);

Avatar.displayName = 'Avatar';
