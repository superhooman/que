import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Loader } from '../../components/Loader';
import { Stack } from '../../components/Stack';
import { Paragraph } from '../../components/Typography';
import { AuthLayout } from '../../layout/Auth';
import { withAuth } from '../../middlewares/withAuth';
import { useTranslation } from 'next-i18next';

const Logout = () => {
    const router = useRouter();
    const { t } = useTranslation('logout');

    React.useEffect(() => {
        signOut().then(() => {
            router.push('/');
        });
    }, [router]);

    return (
        <AuthLayout>
            <Stack fullWidth gap={8} alignItems="center" justifyContent="center">
                <Paragraph>{t('loggingOut')}</Paragraph>
                <Loader />
            </Stack>
        </AuthLayout>
    );
};

export default Logout;

export const getServerSideProps = withAuth(async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || 'en', ['common', 'logout'])),
    }
}), '/auth');
