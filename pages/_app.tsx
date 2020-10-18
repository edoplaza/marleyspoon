import Header from '../components/Header'
import GlobalStyles from '../components/GlobalStyles/GlobalStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles/>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
