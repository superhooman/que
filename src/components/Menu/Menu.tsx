import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, DotFilledIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React, { HTMLAttributes, ReactNode } from 'react';
import { withClassName } from '../../hocs/withClassName';

import cls from './Menu.module.css';

export const MenuLabel = withClassName(DropdownMenu.Label, cls.label);
export const MenuItem = withClassName(DropdownMenu.Item, cls.item);
export const MenuRightSlot = withClassName((props: HTMLAttributes<HTMLDivElement>) => <div {...props} />, cls.rightSlot);

export const MenuSeparator = withClassName(DropdownMenu.Separator, cls.separator);

export const MenuCheckboxItem: React.FC<DropdownMenu.DropdownMenuCheckboxItemProps> = ({ className, children, ...props }) => (
  <DropdownMenu.CheckboxItem
    className={clsx(cls.item, cls.checkboxItem, className)}
    {...props}
  >
    <DropdownMenu.ItemIndicator className={cls.indicator}>
      <CheckIcon />
    </DropdownMenu.ItemIndicator>
    {children}
  </DropdownMenu.CheckboxItem>
);

export const MenuRadioGroup = withClassName(DropdownMenu.RadioGroup, cls.radioGroup);

export const MenuRadioItem: React.FC<DropdownMenu.DropdownMenuRadioItemProps> = ({ className, children, ...props }) => (
  <DropdownMenu.RadioItem
    className={clsx(cls.item, cls.radioItem, className)}
    {...props}
  >
    <DropdownMenu.ItemIndicator className={cls.indicator}>
      <DotFilledIcon />
    </DropdownMenu.ItemIndicator>
    {children}
  </DropdownMenu.RadioItem>
);

interface Props extends DropdownMenu.DropdownMenuProps {
  content: ReactNode;
  withArrow?: boolean;
  align?: 'start' | 'center' | 'end';
}

const Menu: React.FC<Props> = ({ content, children, withArrow = true, align = 'center', ...props }) => (
  <DropdownMenu.Root
    {...props}
  >
    <DropdownMenu.Trigger asChild>
      {children}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content
      className={cls.root}
      sideOffset={8}
      align={align}
    >
      {content}
      {withArrow ? <DropdownMenu.Arrow offset={8} className={cls.arrow} /> : null}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);

export default Menu;