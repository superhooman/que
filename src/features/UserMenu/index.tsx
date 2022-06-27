import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { Button } from '../../components/Button';
import { Menu, MenuItemWithIcon } from '../../components/Menu';
import { User } from '../User';

export const UserMenu = () => {
    const { t } = useTranslation('common');
    const { data: session, status } = useSession();
    const logout = React.useCallback(() => signOut(), []);

    if (status === 'unauthenticated' || !session) {
      return (
        <Link href="/auth">
          <Button>{t('login')}</Button>
        </Link>
      );
    }

    return (
        <Menu
          align="end"
          withArrow={false}
          content={(
            <>
              <Link href="/dashboard">
                <MenuItemWithIcon
                  icon={<PersonIcon />}
                >
                  Profile
                </MenuItemWithIcon>
              </Link>
              <MenuItemWithIcon
                icon={<ExitIcon />}
                onClick={logout}
              >
                Logout
              </MenuItemWithIcon>
            </>
          )}>
          <User size="md" />
        </Menu>
    );
};