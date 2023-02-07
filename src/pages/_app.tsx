// import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import AppLayout from "@common/navigation/AppLayout"
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionProvider>
  )
}

export default App;