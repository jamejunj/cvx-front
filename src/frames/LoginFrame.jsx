import React from 'react'

import { Outlet } from 'react-router-dom'
import License from '../components/License/License'

function LoginFrame() {
  return (
    <React.Fragment>
      {/* <div className="fixed top-0 text-slate-500 h-16 w-full flex flex-row-reverse items-center px-8">
        <div>TH | EN</div>
      </div> */}
      <div className="flex flex-col min-h-screen justify-center items-center space-y-2 bg-orange-50">
        <Outlet/>
        <License />
      </div>
    </React.Fragment>
  )
}

export default LoginFrame