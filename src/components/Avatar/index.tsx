import React, { HTMLAttributes } from 'react';
import * as AvatarBase from '@radix-ui/react-avatar';
import cls from './Avatar.module.scss';
import clsx from 'clsx';
import { Loader } from '../Loader';
import { Size } from '../../typings/size';
import { UserIcon } from '@heroicons/react/solid';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  image?: string;
  name?: string;
  size?: Size;
  loading?: boolean;
}

const getInitials = (name: string) => name.split(' ').map((n) => n[0].toUpperCase() || '').join('');

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ image, name, size = 'sm', className, loading, ...props }, ref) => (
    <AvatarBase.Root
      ref={ref}
      className={clsx(className, cls.root)}
      data-size={size}
      {...props}
    >
      {loading ? (
        <div className={cls.loading}>
          <Loader />
        </div>
      ) : (
        <>
          <AvatarBase.AvatarImage
            src={image}
            alt={name}
            className={cls.img}
          />
          <AvatarBase.AvatarFallback
            delayMs={600}
            className={cls.fallback}
          >
            {name ? getInitials(name) : <UserIcon />}
          </AvatarBase.AvatarFallback>
        </>
      )}
    </AvatarBase.Root>
  )
);

Avatar.displayName = 'Avatar';
