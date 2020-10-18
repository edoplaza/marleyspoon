import Header from '../components/Header'
import GlobalStyles from '../components/GlobalStyles/GlobalStyles';

type AppProps = {
  pageProps: any,
  Component: any
}
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles/>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default App
