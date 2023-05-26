import { useParams, Link, useNavigate } from "react-router-dom";
import useGrab from "../../hooks/useGrab";
import moment from "moment";

import { useContext, useState, useEffect } from "react";
import {AuthContext} from "../../contexts/AuthContext";

import Score from "../../components/Score/Score";

function Gradebook() {
  const auth = useContext(AuthContext)
  const { data, loading, error } = useGrab({
    url: '/api/courses/' + useParams().courseid + '/gradebook/',
  }, auth.token)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.log(error)
    return <div>Error</div>
  }
  console.log(data)
    return (
    <div className="container mx-auto p-4">
        <h2 className="font-bold text-3xl my-4">Gradebook</h2>
        <div className="max-w-full overflow-x-auto">
        <table className="table w-full bg-white dark:bg-slate-800 shadow rounded-2xl overflow-hidden">
          <thead>
            <tr>
              <th>Evaluation</th>
              <th className="w-24">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return <tr key={index}>
              <td>{item.gradable_name}</td>
              <td><Score score={item.score} max={item.gradable_score} show={item.score!==null}/></td>
            </tr>
            })}
          </tbody>
          <tfoot>
            <tr>
              <th className="text-left">Final Grade</th>
              <th><Score grade={'B'} show={false}/></th>
            </tr>
          </tfoot>
        </table>
        </div>
        <div className="mt-8">
        <h2 className="font-bold text-3xl my-4">Attendance</h2>
          <AttendanceList />
        </div>
        <div className="mt-8">
          <h2 className="font-bold text-3xl my-4">Assignment Score</h2>
          <AssignmentScoreList />
        </div>
    </div>
  )
}

function AttendanceList(){
  const auth = useContext(AuthContext)
  const { data, error, loading } = useGrab({
    url: '/api/courses/:course_id/schedules/my'.replace(':course_id', useParams().courseid),
    method: 'GET',
  }, auth.token)
  if (loading) {
    return <div>Loading</div>
  }
  return ( 
    <div className="grid md:grid-cols-8 gap-2">
      {data.map((schedule, index) => {
        console.log(schedule)
        return <div key={index} className="flex flex-col bg-white dark:bg-slate-800 shadow">
            <div className="p-2 text-center border-b dark:border-slate-700 font-medium">Week {index+1}</div>
            <div className="p-2 text-center">
            <Status status={schedule.attendance}/>
            </div>
            <div className="p-2 text-sm text-center text-slate-500 dark:text-slate-400">
              {moment(schedule.schedule_start).format('DD MMM YYYY')}
            </div>
          </div>
          
      })}
    </div>
  )
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

function AssignmentScoreList() {
  const { data, error, loading } = useGrab({
    url: '/api/courses/:course_id/assignments/my'.replace(':course_id', useParams().courseid),
  }, localStorage.getItem('token'))
  const [assignments, setAssignments] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    if (!loading && !error && data) {
      setAssignments(data.sort((a,b)=>{
        return moment(a.due).diff(moment(b.due))
      }))
    }
  }, [data])
  return (
    <div className="relative overflow-x-auto">
      <table className="table w-full bg-white dark:bg-slate-800 shadow rounded-2xl overflow-hidden">
          <thead>
            <tr>
              <th scope="col">Assignment</th>
              <th scope="col" className="w-36">Due Date</th>
              <th scope="col" className="w-36">Submitted Date</th>
              <th scope="col" className="w-36">Status</th>
              <th scope="col" className="w-24">Score</th>
              <th scope="col" className="w-36">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((asgn, index) => {
              console.log(asgn)
              return <tr key={index}> 
              <td className="whitespace-nowrap">
                <div className="flex space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                <div>{asgn.assignment_name}</div>
                </div>
                </td>
              <td className="whitespace-nowrap">{asgn.assignment_due ? moment(asgn.assignment_due).format('DD MMM YYYY HH:mm') : 'No due date'}</td>
              <td className="whitespace-nowrap">{asgn.my ? moment(asgn.my.datetime).format('DD MMM YYYY HH:mm') : 'Not submitted'}</td>
              <td className="text-center">{asgn.completed ? (asgn.my?.feedback.show ? 'Graded' : 'Submitted') : 'Assigned'}</td>
              <td><Score score={asgn.my?.feedback.score} max={asgn.assignment_score} show={asgn.my?.feedback.show}/></td>
              <td className="">{((asgn.my?.feedback.show && asgn.my?.feedback.comment)) ?
              <Link className="flex justify-center items-center hover:text-sky-500" to={"./../assignments/" + asgn._id + "/worksheet"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              </Link> : null}</td>
            </tr>
            })}
          </tbody>
        </table>
    </div>
  )
}

export default Gradebook