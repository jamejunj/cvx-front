import React from 'react'
import { useParams } from 'react-router-dom'
import useGrab from '../../hooks/useGrab'
import moment from 'moment'

import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Schedule() {
  const auth = useContext(AuthContext)
  const { data, error, loading } = useGrab({
    url: '/api/courses/:course_id/schedules/my'.replace(':course_id', useParams().courseid),
    method: 'GET',
  }, auth.token)
  if (loading) {
    return <div>Loading</div>
  }
  console.log(data)
  return (
    <div className="">
        <h2 className="text-3xl font-bold my-4">Schedule</h2>
        <div className="space-y-2">
            {data.map((schedule, index) => {
              return <ScheduleItem key={index} name={schedule.schedule_name} status={schedule.attendance} start={new Date(schedule.schedule_start)} end={new Date(schedule.schedule_end)}/>
            })}
            {data.length === 0 && <div className="text-gray-500">No schedules</div>}
        </div>
    </div>
  )
}

function ScheduleItem({name, status, start, end}){
    return <div className="p-2 border bg-white dark:bg-slate-800 border-slate-200 dark:border-transparent rounded-2xl">
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-between">
      <div className="flex space-x-2">
      <div className="icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
      </div>
      <div className="title font-bold">{name}</div>
      </div>
      <div className="detail flex flex-row justify-between items-center md:justify-start md:items-start md:flex-col border-t pt-2 md:border-t-0 md:border-l md:pt-0 md:pl-2 border-slate-200 dark:border-slate-800 space-x-2 md:space-x-0 md:space-y-2 md:w-72 lg:w-96">
        <div className="type flex space-x-2">
          <div className="type--icon">
          <Status status={status}/>
          </div>
        </div>
        <div className="due flex space-x-2">
          <div className="due--icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
          </div>
          <div>{moment(start).format('D MMM YYYY, HH:mm') + '-' + moment(end).format('HH:mm')}</div>
        </div>
      </div>
    </div>
    </div>
}

function Status({status}){
    switch (status) {
        case 3:
            return <span className="block text-sm rounded-[1rem] px-4 py-1 bg-green-200 text-green-700">Present</span>
        case 2:
            return <span className="block text-sm rounded-[1rem] px-4 py-1 bg-orange-200 text-orange-700">Late</span>
        case 1:
            return <span className="block text-sm rounded-[1rem] px-4 py-1 bg-red-200 text-red-700">Absent</span>
        default:
            return <span className="block text-sm rounded-[1rem] px-4 py-1 bg-slate-200 text-slate-700">N/A</span>
    }
}

export default Schedule