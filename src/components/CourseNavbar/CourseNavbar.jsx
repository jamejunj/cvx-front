import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

const menuList = [
  {to: 'home', name: 'Home'},
  {to: 'content', name: 'Content'},
  {to: 'assignments', name: 'Assignments'},
  {to: 'discussion', name: 'Discussion'},
  {to: 'group', name: 'Group'},
  {to: 'schedule', name: 'Schedule', hidden: true},
  {to: 'meeting', name: 'Meeting'},
  {to: 'grade', name: 'Grade'},
  {to: 'about', name: 'About'},
]

function NavMenu({to, children}) {
  const NavClassName = state => {
    const base = "block p-2 rounded-[2rem] text-center"
    if (state.isActive){ 
        return base + " hover:bg-slate-700 bg-slate-800 dark:bg-slate-200 dark:hover:bg-slate-300 dark:text-black text-white shadow"
    }else{
        return base + " hover:bg-slate-200 dark:hover:bg-slate-800"
    }
  }
  return (
    <li className="flex-1"><NavLink className={NavClassName} to={to}>{children}</NavLink></li>
  )
}

function CourseNavbar({id, name, img}) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [location])
  const handleMobileNav = (e) => {
    setOpen(!open)
  }
  return (
    <>
    <Breadcrumbs/>
    <div className="relative max-h-32 md:max-h-60 flex overflow-hidden">
    <img className="object-cover w-full" src={img} alt="" />
    <div className="absolute inset-0 bg-black bg-opacity-25">
    <div className="max-w-full flex flex-col justify-center h-32 md:h-60 bg-transparent p-2 md:p-8 space-y-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white">{name}</h1>
        <nav className="hidden md:block">
            <ul className="md:flex bg-white dark:bg-gray-900 justify-between p-2 md:rounded-[3rem] w-full space-x-2">
                {menuList.map((item, index) => {  
                    if (!item.hidden)
                      return <NavMenu key={index} to={item.to}>{item.name}</NavMenu>
                })}
            </ul>
        </nav>
      </div>
    </div>
    </div>
    <nav className={`${open ? "visible right-2" : " -right-[100%]"} z-20 transition-all duration-300 md:hidden fixed bottom-32 w-64`}>
        <ul className="flex flex-col bg-white dark:bg-slate-900 shadow rounded-lg justify-between items-stretch p-2 md:rounded-lg w-full space-y-1">
                {menuList.map((item, index) => {
                    if (!item.hidden)
                      return <NavMenu key={index} to={item.to}>{item.name}</NavMenu>
                })}
        </ul>
     </nav>
     <button onClick={handleMobileNav} className="md:hidden fixed bottom-12 right-4 z-20 cursor-pointer rounded-full w-16 h-16 bg-sky-500 hover:bg-sky-700 text-white inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
     </button>
    </>
    
  )
}

// function CourseNavbar({id, name}) {
//   const [open, setOpen] = useState(false)
//   const handleMobileNav = () => {
//     setOpen(!open)
//   }
//   return (
//     <>
//     <div className="flex flex-col justify-center h-32 md:h-60 bg-gradient-to-bl from-sky-500 to-sky-400 p-2 md:p-8 space-y-8">
//         <h1 className="text-3xl md:text-5xl font-bold text-white">{name.toUpperCase()}</h1>
//         <nav className="hidden md:block">
//             <ul className="md:flex bg-white justify-between p-2 md:rounded-[3rem] w-full space-x-2">
//                 {menuList.map((item, index) => {
//                     return <NavMenu key={index} to={item.to}>{item.name}</NavMenu>
//                 })}
//             </ul>
//         </nav>
//     </div>
//     <nav className={`${open ? "visible right-2" : " -right-[100%]"} transition-all md:hidden fixed bottom-24 w-64`}>
//         <ul className="flex flex-col bg-white shadow rounded-lg justify-between items-stretch p-2 md:rounded-lg w-full space-y-2">
//                 {menuList.map((item, index) => {
//                     return <NavMenu key={index} to={item.to}>{item.name}</NavMenu>
//                 })}
//         </ul>
//      </nav>
//      <button onClick={handleMobileNav} className="md:hidden fixed bottom-2 right-2 cursor-pointer rounded-full w-16 h-16 bg-sky-500 hover:bg-sky-700 text-white inline-flex items-center justify-center">
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//         </svg>
//      </button>
//     </>
    
//   )
// }

export default CourseNavbar