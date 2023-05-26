import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

import Navbar from '../components/Navbar/Navbar'
import License from '../components/License/License'

function MainFrame() {

  return (
    <div className="flex flex-col min-h-screen justify-between bg-orange-50 dark:bg-gray-900 dark:text-slate-50">
        <Navbar />
        <div className="flex-1">
        <Outlet/>
        </div>
        <License/>
    </div>
  )
}

export default MainFrame