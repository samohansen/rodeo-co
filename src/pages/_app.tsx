// import '@/styles/globals.css'
import AppLayout from "@common/navigation/AppLayout"
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default App;