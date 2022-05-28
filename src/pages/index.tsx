import type { GetServerSideProps, NextPage } from 'next';
import { Stack } from '../components/Stack';
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Avatar } from '../components/Avatar';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Menu, MenuCheckboxItem, MenuItem, MenuLabel, MenuRadioGroup, MenuRadioItem, MenuRightSlot, MenuSeparator } from '../components/Menu';

interface Props {
  session: Session | null;
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (!session || !session.user) {
    return (
      <Link href="/modal">
        <a>to login</a>
      </Link>
    );
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <Stack direction="column" gap={20} alignItems="center">
        <Menu
          align="end"
          content={(
            <>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Logout<MenuRightSlot>ctrl+L</MenuRightSlot></MenuItem>
              <MenuSeparator />
              <MenuLabel>Theme</MenuLabel>
              <MenuRadioGroup value="light">
                <MenuRadioItem value="light">Light</MenuRadioItem>
                <MenuRadioItem value="dark">Dark</MenuRadioItem>
                <MenuRadioItem value="system">System</MenuRadioItem>
              </MenuRadioGroup>
            </>
          )}>
          <Avatar
            image={session.user?.image || ''}
            name={session.user?.name || ''}
            size="md"
          />
        </Menu>
      </Stack>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    }
  };
};
