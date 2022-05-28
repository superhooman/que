import React, { HTMLAttributes, ReactNode, useId } from 'react';
import cls from './Input.module.css';

interface Props extends HTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'date' | 'datetime-local';
  left?: ReactNode;
  right?: ReactNode;
  icon?: ReactNode;
  error?: boolean | string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, right, left, icon, error, id, ...props }, ref) => {
    const componentId = useId();

    const htmlId = id || componentId;

    return (
      <div className={cls.wrapper}>
        {label ? <label className={cls.label} htmlFor={htmlId}>{label}</label> : null}
        <div className={cls.root} data-error={error}>
          {left ? <div className={cls.right}>{left}</div> : null}
          {icon ? <div className={cls.icon}>{icon}</div> : null}
          <input
            {...props}
            id={htmlId}
            ref={ref}
          />
          {right ? <div className={cls.right}>{right}</div> : null}
        </div>
        {typeof error === 'string' && error ? <span className={cls.error}>{error}</span> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';