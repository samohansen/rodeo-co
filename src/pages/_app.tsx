import { SessionProvider } from 'next-auth/react';
import RootLayout from "@common/layouts/RootLayout"
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import {useRouter} from 'next/router';
import type { NextPageWithLayout } from '@common/types';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <RootLayout>
        {getLayout(<Component {...pageProps} />)}
      </RootLayout>
    </SessionProvider>
  );
}

export default App;