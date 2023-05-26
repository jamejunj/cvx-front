import { useMemo, useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import axios from 'axios'

function useAuthentication() {
    const auth = useContext(AuthContext)
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)

    const checkCredential = async (token) => {
        if (token) {
            try {
                const response = await axios.get(import.meta.env.VITE_SERVER + '/api/users/me', {
                    headers: {
                        authorization: token
                    }
                })
                if (response.data){
                    setToken(token)
                    setLogin(true)
                    setUser(response.data?.data)
                    console.log(user)
                    setLoading(false)
                }else{
                    setLoading(false)
                    setLogin(false)
                    setToken(null)
                    setUser(null)
                    auth.token = null
                    localStorage.removeItem('token')
                }
            }
            catch (err){
                console.log(err)
                setLoading(false)
                setLogin(false)
                setToken(null)
                setUser(null)
                auth.token = null
                localStorage.removeItem('token')
            }
        } else {
            setLoading(false)
            setLogin(false)
            setToken(null)
        }
    }
    useEffect(() => {
        setLoading(true)
        if (auth.token){
            checkCredential(auth.token);
        }else{
            setLoading(false)
        }
    }, [])
       
  return { login, user, loading, token }
}

export default useAuthentication