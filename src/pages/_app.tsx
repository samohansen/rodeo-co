// import '@/styles/globals.css'
import AppLayout from "@common/navigation/AppLayout"
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppLayout>
      hey why isn't this working :(
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default App;