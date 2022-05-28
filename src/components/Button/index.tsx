import React, { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Loader } from '../Loader';

import cls from './Button.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, children, variant = 'default', loading, icon, disabled, ...props }, ref) => (
    <button
      className={clsx(className, cls.root)}
      ref={ref}
      data-type={variant}
      data-loading={loading}
      disabled={loading || disabled}
      {...props}
    >
      {icon ? <span className={cls.icon}>{icon}</span> : null}
      <span>{children}</span>
      {loading ? (
        <div className={cls.loading}>
          <Loader />
        </div>
      ) : null}
    </button>
  )
);

Button.displayName = 'Button';
