import { LogoutIcon, DocumentIcon, UserIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../../components/Button';
import { Menu, MenuItemWithIcon } from '../../components/Menu';
import { User } from '../User';

export const UserMenu = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { data: session, status } = useSession();
  const logout = React.useCallback(() => signOut(), []);

  const isDashboard = router.pathname.includes('/dashboard');

  if (status === 'unauthenticated' || !session) {
    return (
      <Link href="/auth" passHref>
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
          {
            isDashboard ? (
              <Link href="/dashboard/page">
                <a>
                  <MenuItemWithIcon
                    icon={<DocumentIcon />}
                  >
                    Page
                  </MenuItemWithIcon>
                </a>
              </Link>
            ) : (
              <Link href="/dashboard">
                <a>
                  <MenuItemWithIcon
                    icon={<UserIcon />}
                  >
                    Profile
                  </MenuItemWithIcon>
                </a>
              </Link>
            )
          }
          <MenuItemWithIcon
            icon={<LogoutIcon />}
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
