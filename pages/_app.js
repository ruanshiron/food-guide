import Main from '../components/Main'
import '../styles/globals.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AuthProvider } from '../utils/auth/AuthProvider'

library.add(fas)

function App({ Component, pageProps, router}) {
  return (
    <AuthProvider>
      <Main>
        <Component {...pageProps} key={router.route} /> 
      </Main>
    </AuthProvider>
  )
}

export default App
