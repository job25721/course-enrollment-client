// import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { useStore } from '../src/store'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
