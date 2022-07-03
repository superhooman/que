import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import NextProgress from 'next-progress';
import { withTRPC } from '@trpc/next';

import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';

import { useBee } from '@src/utils/hooks/useBee';
import { Toasts } from '@src/features/Toasts';

import { AppRouter } from './api/trpc/[trpc]';

import '@src/styles/reset.css';
import '@src/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  const session = pageProps.session as Session;

  useBee();

  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Toasts />
      <Component {...pageProps} />
      <NextProgress delay={300} options={{ showSpinner: false }} />
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.NODE_ENV === 'production'
      ? `https://${
          process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
            ? 'que.fyi'
            : process.env.NEXT_PUBLIC_VERCEL_URL
        }/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
    };
  },
  ssr: true,
})(appWithTranslation(App));
