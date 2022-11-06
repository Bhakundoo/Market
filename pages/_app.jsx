import '../styles/globals.css'
import Layout from '../layout/Layout'
import { ThemeProvider } from '../context/ThemeContextProvider'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
