import Logo from '../assets/images/cv-logo.png'

import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import axios from 'axios'

function LoginChoice() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  if (auth.token) {
    navigate('/', { replace: true });
  }
  // const handleLogin = async () => {
  //   const token = prompt('Enter your student id: ');
  //   const result = await axios.request({
  //     url: import.meta.env.VITE_SERVER + '/api/users/login',
  //     method: 'post',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     data: {
  //       token: token
  //     }
  //   })
  //   if (result.data.error) {
  //     alert("Login Fail")
  //     return;
  //   }
  //   auth.token = result.data.data.token
  //   localStorage.setItem('token', auth.token)
  //   navigate('/', { replace: true });
  // }
  const loginURI = new URL('https://www.mycourseville.com/api/oauth/authorize');
  loginURI.searchParams.append('response_type', 'code');
  loginURI.searchParams.append('client_id', 'courseville_x');
  loginURI.href += '&redirect_uri=https://www.coursevillex.com/api/callback'
  return (
    <>
      <img className="h-16" src={Logo} alt="mycourseville-logo"/>
        <div className="text-sm text-slate-500">Please login with myCourseVille account</div>
        <div className="p-4 button__list align-center space-y-2">
          <a href={loginURI}><button className="h-16 align-middle rounded-2xl shadow-md py-2 px-4 border-2 border-slate-200 hover:border-orange-500 hover:shadow-orange-200 transition-all hover:-translate-y-2 text-slate-700 font-bold bg-white">
            Login with <img className="h-6 inline -translate-y-1" src={Logo} alt="myCourseVille" /> Account
          </button></a>
          {/* <button onClick={handleLogin} className="rounded-lg border border-slate-300 hover:shadow-lg px-4 py-2 text-slate-700">Login with CU Account</button>
          <button onClick={handleLogin} className="rounded-lg border border-slate-300 hover:shadow-lg px-4 py-2 text-slate-700">Login with Facebook</button>
          <button onClick={handleLogin} className="rounded-lg border border-slate-300 hover:shadow-lg px-4 py-2 text-slate-700">Login with <img className="h-4 inline" src={Logo} alt="mycourseville-logo" srcset="" /> account</button>
          <button onClick={handleLogin} className="rounded-lg border border-slate-300 hover:shadow-lg px-4 py-2 text-slate-700">Login with Google</button> */}
        </div>
    </>
  )
}

export default LoginChoice