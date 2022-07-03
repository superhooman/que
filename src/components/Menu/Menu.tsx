import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React, { HTMLAttributes, ReactNode } from 'react';

import { withClassName } from '@src/utils/hocs/withClassName';
import { Stack } from '@src/components/Stack';

import cls from './Menu.module.scss';

export const withIcon = <T extends { children?: ReactNode }>(Component: React.ComponentType<T>) => {
  const ComponentWithClassName = (props : T & { icon: ReactNode }) => {
    const { icon, children } = props;
    const omittedProps = { ...props };

    delete omittedProps.icon;
    delete omittedProps.children;

    return (
      <Component {...omittedProps}>
        <Stack gap={8} alignItems="center">
          <div className={cls.icon}>{icon}</div>
          <span>{children}</span>
        </Stack>
      </Component>
    );
  };

  return ComponentWithClassName;
};

export const MenuLabel = withClassName(DropdownMenu.Label, cls.label);
export const MenuItem = withClassName(DropdownMenu.Item, cls.item);
export const MenuRightSlot = withClassName((props: HTMLAttributes<HTMLDivElement>) => <div {...props} />, cls.rightSlot);

export const MenuItemWithIcon = withIcon(MenuItem);

export const MenuSeparator = withClassName(DropdownMenu.Separator, cls.separator);

export const MenuCheckboxItem: React.FC<DropdownMenu.DropdownMenuCheckboxItemProps> = ({ className, children, ...props }) => (
  <DropdownMenu.CheckboxItem
    className={clsx(cls.item, cls.checkboxItem, className)}
    {...props}
  >
    <DropdownMenu.ItemIndicator className={cls.indicator}>
      <DotFilledIcon />
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
      <span>•</span>
    </DropdownMenu.ItemIndicator>
    {children}
  </DropdownMenu.RadioItem>
);

interface Props extends DropdownMenu.DropdownMenuProps {
  content: ReactNode;
  withArrow?: boolean;
  align?: 'start' | 'center' | 'end';
  alignOfset?: number
  sideOfset?: number;

}

const Menu: React.FC<Props> = ({
  content,
  children,
  withArrow = true,
  align = 'center',
  alignOfset = 0,
  sideOfset = 8,
  ...props
}) => (
  <DropdownMenu.Root
    {...props}
  >
    <DropdownMenu.Trigger asChild>
      {children}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content
      className={cls.root}
      sideOffset={sideOfset}
      alignOffset={alignOfset}
      align={align}
    >
      {content}
      {withArrow ? (
        <DropdownMenu.Arrow offset={13} asChild>
          <svg className={cls.arrow} width="32" height="12" viewBox="0 0 32 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1C12 1 11.5 11 16 11C20.5 11 20 1 32 1" stroke="var(--c-border)" fill="var(--c-bg)"/>
          </svg>
        </DropdownMenu.Arrow>
      ) : null}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);

export default Menu;
