import {useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const HOST_NAME = import.meta.env.VITE_SERVER

function useGrab({
    url,
    method,
    body,
}, authToken='', refetch=[]) {
    url = HOST_NAME + url
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        let isMounted = true
        setLoading(true)
        setData([])

        const response = axios.request({
            url,
            method,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken,
            }
        }).then(async res=>{
            if (isMounted){
                setData(res.data.data)
            }
        }).catch(err=>{
            if (isMounted) {
                setError(err);
            }
        }).finally(()=>{
            if (isMounted) {
                setLoading(false);
            }
        })
        return () => {
            isMounted = false;
        };
    }, [url, ...refetch])
    return {data, error, loading}
}

export default useGrab