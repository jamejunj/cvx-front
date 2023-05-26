import axios from "axios"
import useGrab from "./useGrab"
import { useContext, useEffect, useState } from "react"

function useNotification() {
  const [notifications, setNotifications] = useState([])
  const [tick, setTick] = useState(0)
  const [unread, setUnread] = useState(0)
  const {data, loading, error} = useGrab({
    url: '/api/users/notifications',
    method: 'GET',
  }, localStorage.getItem('token'), [tick])
  const readAll = async () => {
    await axios.post(import.meta.env.VITE_SERVER + '/api/users/notifications/', {}, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    });
    setUnread(0)
  }
  useEffect(() => {
    if (data && data.notifications) {
      setNotifications(data.notifications.filter(noti=>(new Date() - new Date(noti.timestamp) < 1000 * 60 * 60 * 24 * 14) ).sort((a,b)=>{
        return new Date(b.timestamp) - new Date(a.timestamp)
      }) || [])
      setUnread(parseInt(data.unread_notifications) || 0)
    }    
    setTimeout(() => {
      setTick(tick + 1)
    }, 60000)
  }, [data])
  return { notifications, unread, loading, error, tick, readAll }
}

export default useNotification