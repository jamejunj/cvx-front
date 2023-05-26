import { useState, useRef } from 'react'
import { Outlet, useParams, Link } from 'react-router-dom'
import Schedule from './Schedule'

import Announcements from './Announcements'
import useGrab from '../../hooks/useGrab'
import moment from 'moment'

import Kind from '../../utils/Kind'

function Home() {
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 order-2 md:order-1">
          <Announcements/>
          <Schedule/>
        </div>
        {/* Right side */}
        <div className="col-span-1 order-1">
          <Community/>
          <RecentActivities/>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

function Community(){
  const { data, loading } = useGrab({
      url: "/api/courses/" + useParams().courseid,
      method: "GET",   
  })
  if(loading) return <div>Loading...</div>
  if(!data) return <div>Failed to load</div>
  console.log(data)
  return <ul className="flex flex-col space-y-2">
      {data.course_contact?.facebook && <a href={data.course_contact?.facebook} target="_blank" rel="noopener noreferer"><li className="flex space-x-2 rounded-2xl bg-white hover:border-sky-500 p-2 border-2 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-400">
          <img className="block w-12 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" alt="facebook icons"/>
          <div className="font-bold">
              Facebook Group
          </div>
      </li></a>}
      {data.course_contact?.team && <a href={data.course_contact?.team} target="_blank" rel="noopener noreferer"><li className="flex space-x-2 rounded-2xl bg-white hover:border-sky-500 p-2 border-2 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-400">
          <img className="block w-12 h-auto" src="https://www.mycourseville.com/sites/all/modules/courseville/pict/icon_featuremsteams.png" alt="ms-team icons"/>
          <div className="font-bold">
              Team
          </div>
      </li></a>}
      {null && data.course_contact?.echo && <a href={data.course_contact?.echo} target="_blank" rel="noopener noreferer"><li className="flex space-x-2 rounded-2xl bg-white hover:border-sky-500 p-2 border-2 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-400">
          <img className="block w-12 h-auto" src="https://www.mycourseville.com/sites/all/modules/courseville/inc_lti/echo360_button_logo.png" alt="ms-team icons"/>
          <div className="font-bold">
              Launch echo360
          </div>
      </li></a>}
  </ul>
}

function RecentActivities(){
  const { data, loading, error } = useGrab({
    url: '/api/courses/' + useParams().courseid +'/activity'
  }, localStorage.getItem('token'))
  console.log(data)
  return <>
        <h2 className="text-3xl font-bold my-4">Recent Activities</h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-transparent text-sm p-2 space-y-1">
          {loading && <div>Loading...</div>}
          {error && <div>Error</div>}
          {data && data.map((activity, index) => <RecentActivitiesItem key={index} activity={activity}/>)}
          {data && data.length === 0 && <div className="text-slate-500 text-center my-2">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>
                </div>
                <h5 className="text-xl">Stay tuned!</h5>
                <p className="text-sm">This course have no activity yet</p>
                </div>}
        </div>
  </>
}

function RecentActivitiesItem({activity}){
  return <Link to={activity.location} rel="noreferrer noopener" className="rounded-lg cursor-pointer p-2 w-full flex space-x-2 hover:bg-slate-200 dark:hover:bg-slate-700">
    <Kind type={activity.type} className="w-8 h-8"/>
    <div className="flex flex-col flex-1">
        <div className="font-bold">{activity.title}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700">{moment(activity.date).fromNow()}</div>
    </div>
  </Link>
}

export default Home