import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import '../styles/reset.css';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const session = pageProps.session as Session;
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
