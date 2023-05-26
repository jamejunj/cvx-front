import { AuthContext } from './contexts/AuthContext'
import GlobolRouter from './routers/GlobolRouter'

const auth = {}

function App() {
  const code = new URLSearchParams(window.location.search).get('code')
  if (code) {
    localStorage.setItem('token', code)
  }
  if (localStorage.getItem('token')) {
    auth.token = localStorage.getItem('token')
  }else{
    auth.token = false
  }
  if (localStorage.getItem('theme')==='dark'){
    document.documentElement.classList.add("dark")
  }
  console.log(auth.token)
  return (
    <AuthContext.Provider value={auth}>
        <GlobolRouter/>
    </AuthContext.Provider>
  )
}

export default App
