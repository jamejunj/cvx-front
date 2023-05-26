import { useState } from 'react'
import SystemAnnouncement from '../components/SystemAnnouncement/SystemAnnouncement'
import GlobalActivities from '../components/GlobalActivities/GlobalActivities'
import CourseLists from '../components/CourseLists/CourseLists'
function Main() {
  return (
    <div className="container mx-auto p-2">
      <SystemAnnouncement/>
      <GlobalActivities/>
      <CourseLists/>
    </div>
  )
}

export default Main