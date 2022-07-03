import React, { HTMLAttributes, ReactNode, useId } from 'react';

import { SocialIcon } from '@src/components/SocialIcon';

import cls from './Input.module.scss';

interface Props extends HTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'date' | 'datetime-local';
  left?: ReactNode;
  right?: ReactNode;
  icon?: ReactNode;
  suffix?: string;
  error?: boolean | string;
  label?: string;
  value?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, right, left, icon, error, id, suffix, ...props }, ref) => {
    const componentId = useId();

    const htmlId = id || componentId;

    return (
      <div className={cls.wrapper}>
        {label ? <label className={cls.label} htmlFor={htmlId}>{label}</label> : null}
        <div className={cls.root} data-error={error}>
          {left ? <div className={cls.right}>{left}</div> : null}
          {suffix ? <div className={cls.suffix}>{suffix}</div> : null}
          {icon ? (
            <div className={cls.icon}>
              {typeof icon === 'string' ? (
                <SocialIcon icon={icon} />
              ) : (
                icon
              )}
            </div>
          ) : null}
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

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean | string;
  value?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, ...props }, ref) => {
    const componentId = useId();

    const htmlId = id || componentId;

    return (
      <div className={cls.wrapper}>
        {label ? <label className={cls.label} htmlFor={htmlId}>{label}</label> : null}
        <div className={cls.root} data-error={error}>
          <textarea
            {...props}
            id={htmlId}
            ref={ref}
          />
        </div>
        {typeof error === 'string' && error ? <span className={cls.error}>{error}</span> : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
