import '../styles/globals.css'
import Layout from '../layout/Layout'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'
import { persistor, store } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import { ThemeProvider } from '../context/ThemeContextProvider'

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
