import Main from '../components/Main'
import '../styles/globals.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App({ Component, pageProps, router}) {
  return (
    <Main>
      <Component {...pageProps} key={router.route} /> 
    </Main>
  )
}

export default App
