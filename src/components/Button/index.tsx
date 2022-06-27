import React, { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Loader } from '../Loader';

import cls from './Button.module.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  type?: 'submit' | 'button' | 'reset';
  size?: 'default' | 'large';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, children, variant = 'default', loading, icon, disabled, type = 'button', size = 'default', fullWidth, ...props }, ref) => (
    <button
      className={clsx(className, cls.root, { [cls.fullWidth]: fullWidth })}
      ref={ref}
      data-type={variant}
      data-loading={loading}
      data-size={size}
      disabled={loading || disabled}
      type={type}
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
