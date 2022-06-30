import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button } from '../../components/Button';
import { Check } from '../../components/Check';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { Title } from '../../components/Typography';
import { AuthLayout } from '../../layout/Auth';
import { withAuth } from '../../middlewares/withAuth';
import { trpc } from '../../utils/trcp';
import { useFormik } from 'formik';
import { createPageSchema } from '../../validators/page/create';
import { zodToFormik } from '../../utils/zodToFormik';
import { prisma } from '../../prisma/client';
import { useRouter } from 'next/router';
import { HOST } from '../../constants';
import Head from 'next/head';

const Create: NextPage = () => {
    const router = useRouter();
    const mutation = trpc.useMutation(['page.create']);

    const onSubmit = React.useCallback(({ slug }: { slug: string }) => {
        mutation.mutate({ slug });
    }, [mutation]);

    const { getFieldProps, handleSubmit, touched, errors, values: { slug } } = useFormik({
        initialValues: {
            slug: '',
        },
        onSubmit,
        validationSchema: zodToFormik(createPageSchema),
        validateOnChange: true,
        validateOnBlur: false,
    });

    const hasError = Boolean(errors.slug);

    const enabled = !hasError && !!slug;

    const { data, isLoading } = trpc.useQuery(['page.exists', { slug }], { enabled });

    const { t } = useTranslation('create');
    const { t: errorsT } = useTranslation('errors');

    React.useEffect(() => {
        if (mutation.status === 'success') {
            router.push('/dashboard');
        } else if (mutation.status === 'error') {
            alert('error');
        }
    }, [mutation.status, router]);

    return (
        <AuthLayout>
            <Head>
                <title>Create a page</title>
            </Head>
            <Title>{t('title')}</Title>
            <form onSubmit={handleSubmit} autoCapitalize="off" autoCorrect="off" autoComplete="off">
                <Stack gap={8} direction="column">
                    <Input
                        label={t('slug')}
                        suffix={`${HOST}/`}
                        placeholder="pagename"
                        right={slug ? (
                            <Check
                                value={hasError ? false : !data?.exists}
                                loading={hasError ? false : isLoading}
                            />
                        ) : null}
                        error={errors.slug && errorsT(errors.slug)}
                        {...getFieldProps('slug')}
                    />
                    <Button
                        type="submit"
                        loading={mutation.isLoading}
                        disabled={!slug || isLoading || data?.exists || hasError}
                    >
                        {t('submit')}
                    </Button>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export default Create;

export const getServerSideProps = withAuth(async ({ locale }, { id }) => {
    const exists = (await prisma.page.count({
        where: {
            userId: id,
        },
    })) > 0;

    if (exists) {
        return {
            redirect: {
                destination: '/dashboard/',
            },
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common', 'create', 'errors'])),
        }
    };
}, '/auth');
