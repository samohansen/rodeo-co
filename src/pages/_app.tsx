import type { AppProps } from 'next/app'
import type { NextPageWithLayout } from '@common/types';
import { SessionProvider } from 'next-auth/react';
import RootLayout from "@common/layouts/RootLayout"
import {useRouter} from 'next/router';
import { StyledEngineProvider } from '@mui/material/styles';
import '../styles/globals.css'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <StyledEngineProvider injectFirst>
      <SessionProvider session={pageProps.session}>
        <RootLayout>
          {getLayout(<Component {...pageProps} />)}
        </RootLayout>
      </SessionProvider>
    </StyledEngineProvider>
  );
}

export default App;
