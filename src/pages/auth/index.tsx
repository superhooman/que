import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useFormik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { ClientSafeProvider, getCsrfToken, getProviders, signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { API } from '../../api';
import { Button } from '../../components/Button';
import { GoogleIcon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { Slides } from '../../components/Slides';
import { Stack } from '../../components/Stack';
import { Paragraph, Text, Title } from '../../components/Typography';
import { AuthLayout } from '../../layout/Auth';
import { getToken } from '../../utils/getToken';
import { emailSchema } from '../../validators/login/email';

type SignInErrorTypes =
  | 'Signin'
  | 'OAuthSignin'
  | 'OAuthCallback'
  | 'OAuthCreateAccount'
  | 'EmailCreateAccount'
  | 'Callback'
  | 'OAuthAccountNotLinked'
  | 'EmailSignin'
  | 'CredentialsSignin'
  | 'SessionRequired'
  | 'default'

interface Props {
    providers: ClientSafeProvider[];
    csrfToken?: string;
    error: SignInErrorTypes | null
}

type Screen = 0 | 1 | 2;

const ProviderButton: React.FC<{
    provider: string,
    onLogin: (provider: string) => void,
}> = ({ provider, onLogin }) => {
    const { t } = useTranslation('login');
    const onClick = React.useCallback(() => onLogin(provider), [provider, onLogin]);

    if (provider === 'google') {
        return (
            <Button
                icon={<GoogleIcon />}
                onClick={onClick}
            >
                {t('providerGoogle')}
            </Button>
        );
    }
    if (provider === 'email') {
        return (
            <Button
                icon={<EnvelopeClosedIcon />}
                variant="primary"
                onClick={onClick}
            >
                {t('providerEmail')}
            </Button>
        );
    }
    return null;
};

const Slide: React.FC<{ children: ReactNode }> = ({ children }) => (
    <Stack style={{
        minHeight: 172,
    }} grow={1} justifyContent="space-between" direction="column">
        {children}
    </Stack>
);

interface MainSlideProps {
    setScreen: (screen: Screen) => void;
    providers: ClientSafeProvider[];
}

const MainSlide: React.FC<MainSlideProps> = ({ setScreen, providers }) => {
    const { t } = useTranslation('login');

    const onLogin = React.useCallback((provider: string) => {
        if (provider === 'email') {
            setScreen(1);
        } else {
            signIn(provider);
        }
    }, [setScreen]);

    return (
        <Slide>
            <div>
                <Title>{t('signIn')}</Title>
                <Paragraph>{t('disclaimer')}<Link href="/docs/privacy"><a>{t('privacyPolicy')}</a></Link></Paragraph>
            </div>
            <Stack gap={12} direction="column">
                {providers.map(({ id }) => (
                    <ProviderButton
                        key={id}
                        provider={id}
                        onLogin={onLogin}
                    />
                ) )}
            </Stack>
        </Slide>
    );
};

interface EmailSlideProps {
    onEmailLogin: (email: string) => void;
    setEmail: (email: string) => void;
    setScreen: (screen: Screen) => void;
    email: string;
    loading: boolean;
}

const EmailSlide: React.FC<EmailSlideProps> = ({
    onEmailLogin,
    setEmail,
    setScreen,
    email,
    loading,
}) => {
    const { t } = useTranslation('login');
    const { t: errorsT } = useTranslation('errors');

    const goToMain = React.useCallback(() => setScreen(0), [setScreen]);

    const onSubmit = React.useCallback(({ email } : { email: string }) => {
        setEmail(email);
        onEmailLogin(email);
    }, [onEmailLogin, setEmail]);

    const { getFieldProps, handleSubmit, touched, errors } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: emailSchema,
        onSubmit,
    });

    return (
        <Slide>
            <div>
                <Title>{t('emailTitle')}</Title>
                <Paragraph>{t('emailText')}</Paragraph>
            </div>
            <form onSubmit={handleSubmit}>
                <Stack gap={8} direction="column">
                    <Input
                        type="email"
                        placeholder={t('email')}
                        error={touched.email && errors.email && errorsT(errors.email)}
                        {...getFieldProps('email')}
                    />
                    <Stack gap={8} justifyContent="end">
                        <Button onClick={goToMain} variant="ghost">{t('back')}</Button>
                        <Button loading={loading} type="submit">{t('submit')}</Button>
                    </Stack>
                </Stack>
            </form>
        </Slide>
    );
};

interface DoneSlideProps {
    setScreen: (screen: Screen) => void;
    email: string;
}

const DoneSlide: React.FC<DoneSlideProps> = ({
    setScreen,
    email,
}) => {
    const { t } = useTranslation('login');
    const text = React.useMemo(() => {
        const items: ReactNode[] = t('emailDoneText').split('{email}');
        items.splice(1, 0, <Text key="email" as="b" size="sm">{email}</Text>);
        return items;
    }, [t, email]);
    const reset = React.useCallback(() => setScreen(1), [setScreen]);
    return (
        <Slide>
            <div>
                <Title>{t('emailDoneTitle')}</Title>
                <Paragraph
                    type='secondary'
                >
                    {text}
                </Paragraph>
            </div>
            <Stack gap={8} justifyContent="end">
                <Button onClick={reset} variant="ghost">{t('back')}</Button>
                <Link href="/">
                    <Button>{t('done')}</Button>
                </Link>
            </Stack>
        </Slide>
    );
};

const Login: NextPage<Props> = ({ providers, csrfToken, error }) => {
    const { t } = useTranslation('login');
    const [screen, setScreen] = React.useState<Screen>(0);
    const [loading, setLoading] = React.useState(false);

    const [email, setEmail] = React.useState('');

    const onEmailLogin = React.useCallback((email: string) => {
        setLoading(true);
        API.emailAuth(email, csrfToken).then(() => {
            setLoading(false);
            setScreen(2);
        });
    }, [csrfToken]);

    const errorText = error ? t(error) : undefined;

    return (
        <AuthLayout error={errorText}>
            <Head>
                <title>Sign in</title>
            </Head>
            <Slides step={screen}>
                <MainSlide
                    setScreen={setScreen}
                    providers={providers || []}
                />
                <EmailSlide
                    onEmailLogin={onEmailLogin}
                    setEmail={setEmail}
                    setScreen={setScreen}
                    email={email}
                    loading={loading}
                />
                <DoneSlide
                    setScreen={setScreen}
                    email={email}
                />
            </Slides>
        </AuthLayout>
    );
};

export default Login;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const token = await getToken(ctx.req);
    if (token) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    const providers = Object.values(await getProviders() || {});
    const csrfToken = await getCsrfToken(ctx);

    const error = (ctx.query.error && Array.isArray(ctx.query.error) ? ctx.query.error[0] : ctx.query.error || null) as SignInErrorTypes | null;

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'login', 'errors'])),
            providers,
            csrfToken,
            error,
        }
    };
};
