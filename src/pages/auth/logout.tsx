import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Loader } from '@src/components/Loader';
import { Stack } from '@src/components/Stack';
import { Paragraph } from '@src/components/Typography';
import { SmallLayout } from '@src/layout/Small';
import { withAuth } from '@src/utils/next/withAuth';

const Logout = () => {
    const router = useRouter();
    const { t } = useTranslation('logout');

    React.useEffect(() => {
        signOut().then(() => {
            router.push('/');
        });
    }, [router]);

    return (
        <SmallLayout>
            <Stack fullWidth gap={8} alignItems="center" justifyContent="center">
                <Paragraph>{t('loggingOut')}</Paragraph>
                <Loader />
            </Stack>
        </SmallLayout>
    );
};

export default Logout;

export const getServerSideProps = withAuth(async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || 'en', ['common', 'logout'])),
    }
}), '/auth');
