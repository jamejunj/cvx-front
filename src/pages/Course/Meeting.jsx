import moment from 'moment'
import { Outlet, Link, useParams, useOutletContext } from 'react-router-dom'

import useGrab from '../../hooks/useGrab'

function Meeting() {
  const { data, error, loading } = useGrab({
    url: '/api/courses/' + useParams().courseid + '/meetings/',
    method: 'GET',
    body: {}
  }, '')
  if (error || !data) {
    console.log(error)
    return <div>Error</div>
  }
  return (
    <div className="container mx-auto p-4">
    <h2 className="font-bold text-3xl my-4">Online Meeting</h2>
    <div className="space-y-2">
    {loading && <div>Loading</div>}
    {!loading && data.map((meeting) => {
      return <MeetingItem key={meeting._id} meeting={meeting}/>
    })}
    {data && data.length === 0 && <div className="flex flex-col">
            <div className="text-center text-slate-500 dark:text-slate-400 text-xl">Stay tuned!</div>
            <div className="text-center text-slate-500 dark:text-slate-400">This course currently have no meeting</div>
        </div>}
    </div>
    <Outlet context={{course: useOutletContext().course}}/>
    </div>
  )
}

function MeetingItem({meeting}){
    return <div className="p-2 border-2 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-2xl">
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-between">
      <div className="flex space-x-2 items-center">
      <div className="icon p-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
      </div>
      <div className="title">
        <h5 className="text-lg font-bold"><Link className="hover:underline" to={meeting._id + '/preview'}>
          {meeting.meeting_title}
        </Link></h5>
        <p className="text-sm text-slate-500 dark:text-slate-400">{moment(meeting.meeting_start).format('DD MMM YYYY, hh:mm')}</p>
      </div>
      </div>
      <div className="detail flex flex-row justify-between items-center md:justify-start md:items-start md:flex-col border-t pt-2 md:border-t-0 md:border-l md:pt-0 md:pl-2 border-slate-200 dark:border-slate-700 space-x-2 md:space-x-0 md:space-y-2 md:w-48 lg:w-64">
        <div className="flex h-full justify-center items-center space-x-2">
          <Link to={meeting._id + '/preview'}><button className="p-2 rounded hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          </button></Link>
          {meeting.meeting_recording?.show && <Link to={meeting._id + '/recording'}><button className="p-2 rounded hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
          </svg>
          </button></Link>}
          <Link to={meeting._id + '/info'}><button className="p-2 rounded hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          </button></Link>
        </div>
      </div>
    </div>
    </div>
}

export default Meeting