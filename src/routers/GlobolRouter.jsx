import { useContext } from 'react'
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'

import LoginFrame from '../frames/LoginFrame'
import LoginChoice from '../pages/LoginChoice'

import MainFrame from '../frames/MainFrame'
import Main from '../pages/Main'
import Error from '../pages/Error'

// courses
import CourseFrame from '../frames/CourseFrame'
import Home from '../pages/Course/Home'
import Content from '../pages/Course/Content'
import Assignments from '../pages/Course/Assignments'
import AssignmentsPreview from '../pages/Course/AssignmentsPreview'
import AssignmentWorksheet from '../pages/Course/AssignmentWorksheet'
import Discussion from '../pages/Course/Discussion'
import DiscussionTopic from '../pages/Course/DiscussionTopic'
import DiscussionPostView from '../pages/Course/DiscussionPostView'
import Group from '../pages/Course/Group'
import GroupCreate from '../pages/Course/GroupCreate'
import Schedule from '../pages/Course/Schedule'
import Meeting from '../pages/Course/Meeting'
import MeetingInfo from '../pages/Course/MeetingInfo'
import MeetingPreviewDialog from '../pages/Course/MeetingPreviewDialog'
import MeetingRecording from '../pages/Course/MeetingRecording'

import Gradebook from '../pages/Course/Gradebook'
import AboutCourse from '../pages/Course/AboutCourse'

// context
import { AuthContext } from '../contexts/AuthContext'
import Join from '../pages/Join'
import FileView from '../pages/Course/FileView'
import AnnouncementPreview from '../pages/Course/AnnouncementPreview'
import Notification from '../pages/Notification'
import Setting from '../pages/Setting'

import useAuthentication from '../hooks/useAuthentication'

function RouterGuard({to}) {
  const { loading, user } = useAuthentication()
  if (loading) return (<div className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-200 border-b-sky-500"></div>
  </div>)
  else if (user) {
    return to
  } else {
    return <Navigate to="/login" replace />
  }
}

function GlobolRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginFrame />}>
        <Route path="" element={<LoginChoice />} />
      </Route>
      <Route path="/*" element={<RouterGuard to={<MainFrame/>} />}>
        <Route index element={<Main />} />
        <Route path="join" element={<Join/>}/>
        <Route path="notification" element={<Notification/>}/>
        <Route path="setting" element={<Setting/>}/>
        <Route path="course">
          <Route path=":courseid" element={<CourseFrame />}>
            <Route index element={<Navigate to="home" replace/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="announcement" element={<Home/>}>
              <Route path=":announcement_id" element={<AnnouncementPreview/>}/>
              <Route path=":announcement_id/preview" element={<AnnouncementPreview/>}/>
            </Route>
            <Route path="content" element={<Content/>}/>
            <Route path="content/:content_id">
              <Route index element={<Navigate to="view" replace/>}/>
              <Route path="view" element={<FileView/>}/>
            </Route>
            <Route path="assignments" element={<Assignments/>}>
              <Route index />
              <Route path=":asgn_id" element={<Navigate to="preview" replace/>}/>
              <Route path=":asgn_id/preview" element={<AssignmentsPreview/>}/>
            </Route>
            <Route path="assignments/:asgn_id/worksheet" element={<AssignmentWorksheet/>}/>
            <Route path="discussion">
              <Route index element={<Discussion/>}/>
              <Route path=":id" element={<DiscussionTopic/>}>
                <Route index element={<></>}/>
                <Route path="post/:post_id" element={<DiscussionPostView/>}/>
              </Route>
            </Route>            
            <Route path="group" element={<Group/>}>
              <Route index element={<></>}/>
              <Route path="new" element={<GroupCreate/>}/>
            </Route>
            <Route path="schedule" element={<Schedule/>}/>
            <Route path="meeting" element={<Meeting/>}>
              <Route index/>
              <Route path=":meeting_id" element={<Navigate to="preview" replace/>}/>
              <Route path=":meeting_id/preview" element={<MeetingPreviewDialog/>}/>
              <Route path=":meeting_id/recording" element={<MeetingRecording/>}/>
              <Route path=":meeting_id/info" element={<MeetingInfo/>}/>
            </Route>
            <Route path="grade" element={<Gradebook/>}/>
            <Route path="about" element={<AboutCourse/>}/>
            <Route path="*" element={<Error code={404} />}/>            
          </Route>
          <Route path="*" element={<Error code={404} />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default GlobolRouter