import { SessionProvider } from 'next-auth/react';
import AppLayout from "@common/navigation/AppLayout"
import AppLayoutNoLeftNav from "@common/navigation/AppLayoutNoLeftNav" // Hack until Grace tells me how this is meant to be done (S.H.)
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import {useRouter} from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";
  const isRegisterPage = router.pathname === "/register";
  const isSessionValid = !!pageProps.session;

  // sam's hack: I created a new layout w/ no left nav for login and register pages and also for unauthenticated sessions
  if (isLoginPage || isRegisterPage) {
    return (
      <SessionProvider session={pageProps.session}>
        <AppLayoutNoLeftNav>
          <Component {...pageProps} />
        </AppLayoutNoLeftNav>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={pageProps.session}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
    </SessionProvider>
  );
}

export default App;