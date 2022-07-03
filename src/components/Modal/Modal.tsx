import React, { HTMLAttributes, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';

import { withClassName } from '@src/utils/hocs/withClassName';

import cls from './Modal.module.scss';

interface Props extends Dialog.DialogProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

export const ModalTitle = withClassName(Dialog.Title, cls.title);

export const ModalDescription = withClassName(Dialog.Description, cls.description);

export const ModalActions: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={clsx(cls.actions, className)} {...props} />
);

const Modal: React.FC<Props> = ({ children, maxWidth = 'sm', ...props }) => (
  <Dialog.Root
    {...props}
  >
    <Dialog.Portal className={cls.portal}>
      <Dialog.Overlay className={cls.overlay} />
      <div className={cls.wrapper}>
        <Dialog.Content className={cls.content} data-width={maxWidth}>
          {children}
        </Dialog.Content>
      </div>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
