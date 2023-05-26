import Logo from '../../assets/images/cv-logo.png'
import iconDefault from '../../assets/images/icon-default.png'

import { useState, useContext, useRef, useEffect } from 'react'
import { Link, useNavigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

import useAuthentication from '../../hooks/useAuthentication'
import useNotification from '../../hooks/useNotification'
import moment from 'moment'
import Kind from '../../utils/Kind'

function Navbar() {
  const auth = useContext(AuthContext);
  const { loading, user } = useAuthentication();
  const { notifications, unread, readAll } = useNotification();
  let idx = 0;
  const backdropRef = useRef([]);
  const [open, setOpen] = useState("")
  const navigate = useNavigate()
  const location  = useLocation();
  useEffect(() => {
    setOpen("")
  }, [location])
  if (loading) return <div className="sticky z-10 top-0 h-16 bg-white dark:bg-slate-900 shadow flex justify-between w-full"></div>
  
  const handleAccountMenu = () => {
    if (open!=="account-menu"){
      setOpen("account-menu")
    }else{
      setOpen("")
    }
  }
  const handleNotificationMenu = () => {
    if (open!=="notification-menu"){
      setOpen("notification-menu")
      readAll()
    }else{
      setOpen("")
    }
  }
  const backDropClick = (e) => {
    if (backdropRef.current.includes(e.target)){
      setOpen("")
    }
  }

  const logout = () => {
    auth.login = false;
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }
  return (
    <div ref={(el)=>(backdropRef.current[idx++] = el)} onClick={backDropClick} className="sticky z-10 top-0 h-16 bg-white dark:bg-gray-800 shadow flex justify-between w-full">
        <div className="logo p-4">
          <Link to="/" className="block"><img className="max-h-8" src={Logo} alt="myCourseVille's logo"  /></Link>
        </div>
        {/* <div className="search flex-1 p-4">
          <input className="w-full px-4 py-2 bg-white outline-none border-slate-400" placeholder="Search" type="text" name="search" id="" />
        </div> */}
        <div className="flex items-center px-8 space-x-4">
          <Routes>
            <Route path="*" element={<button onClick={handleNotificationMenu}><div className="relative rounded-full cursor-pointer bg-slate-200 dark:text-slate-50 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 w-10 h-10 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          {unread!==0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold px-1 text-sm rounded-[0.625rem]">{unread}</span>}
          </div></button>}/>
          <Route path="notification" element={<div className="relative rounded-full dark:text-slate-50 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 w-10 h-10 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          </div>}/>
          </Routes>
          {/* <div className="relative rounded-full cursor-pointer bg-slate-200 hover:bg-slate-400 w-10 h-10 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white font-bold px-1 text-sm rounded-[0.625rem]">1</span>
          </div> */}
          <button onClick={handleAccountMenu} ><div className="rounded-full overflow-hidden cursor-pointer w-10 h-10 border-slate-200 dark:text-slate-50 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 shadow hover:shadow-lg">
            <img src={user.img ? user.img : "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"} alt=""/>
          </div></button>
        </div>

        <div ref={(el)=>(backdropRef.current[idx++] = el)} onClick={backDropClick} className={`fixed top-16 w-full h-full ${open==="notification-menu" ? '' : 'hidden'}`}>
        <div className="absolute flex flex-col justify-between z-20 right-0 md:top-2 md:right-6 w-full md:max-w-[30rem] bg-white dark:text-slate-50 dark:bg-slate-800 shadow-lg rounded divide-y divide-slate-200 dark:divide-slate-700 max-sm:h-full max-h-[calc(100%_-_4rem)] md:max-h-96">
            <div className="p-3">
              <h5 className="font-bold text-lg">Notification</h5>
            </div>
              <div className="p-2 flex-1 overflow-auto">
                <ul>
                  {notifications.map((notification, index) => {
                    return <NotificationItem onClick={()=>setOpen("")} key={index} notification={notification} />
                  })}
                  {notifications && notifications.length === 0 && <div className="text-slate-500 dark:text-slate-400 text-center my-2">
                  <div className="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                  </svg>
                  </div>
                  <h5 className="text-xl">No new activity!</h5>
                  <p className="text-sm">No new activity in past 14 days</p>
                  </div>}
                </ul>
              </div>
              <div className="p-2 text-center">
                <Link to="notification" className="text-blue-500 dark:text-sky-200 hover:underline">See all notification</Link>
              </div>
        </div>
        </div>
        <div ref={(el)=>(backdropRef.current[idx++] = el)} onClick={backDropClick} className={`fixed top-16 w-full h-full z-10 ${open==="account-menu" ? '' : 'hidden'}`}>
        <div className="absolute max-md:h-full z-20 max-md:top-0 max-md:right-0 max-md:w-full top-2 right-6 w-full md:max-w-sm bg-white dark:bg-slate-800 dark:text-slate-50 shadow-lg rounded divide-y divide-slate-200 dark:divide-slate-600 ">
            <div className="userinfo p-4">
              <div className="flex space-x-2">
                <div className="rounded-full overflow-hidden w-12 h-12 border-slate-200 shadow">
                <img src={user.img ? user.img : "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"} alt={user.fname + "'s profile"} />
                </div>
                <div>
                <h5 className="font-medium text-lg">{user.first} {user.last}</h5>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{user.email}</p>
                </div>
              </div>
            </div>
              <div className="p-2">
                <ul className="">
                  <li className=""><Link to="/join" className="flex gap-2  hover:bg-slate-200 dark:hover:bg-slate-900 p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                    <span>Join new course</span> 
                  </Link></li>
                  <li className=""><Link to="/setting" className="flex gap-2 hover:bg-slate-200 dark:hover:bg-slate-900 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Setting</span>
                  </Link></li>
                  {/* <li className=""><Link to="/help" className="inline-flex hover:bg-slate-200 dark:hover:bg-slate-900 p-2 rounded">Help</Link></li> */}
                </ul>
              </div>
              <div className="p-2 max-md:fixed max-md:bottom-0 max-md:w-full">
                <ul>
                  <li><button onClick={logout} className="flex gap-2 w-full text-left text-red-500 dark:text-red-400 hover:bg-slate-200 dark:hover:bg-slate-900 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span>Logout</span>
                  </button></li>
                </ul>
              </div>
        </div>
        </div>
    </div>
  )
}

function NotificationItem({onClick, notification}){
  const message = notification['message']['message'];
  const timestamp = notification.timestamp;
  return <li onClick={onClick}><Link to={message.link} className="block hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded">
                    <div className="flex space-x-4 p-2">
                      <div className="icon relative">
                        <Kind type={message.type} className="w-10 h-10"/>
                      </div>
                      <div className="flex flex-col justify-between">
                        <p><strong>{message.course_name}</strong> {message.message}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{moment(timestamp).fromNow()}</p>
                      </div>
                    </div>
                  </Link></li>
}

export default Navbar