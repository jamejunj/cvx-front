import * as Tabs from '@radix-ui/react-tabs';
import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, Link, useParams } from 'react-router-dom';
import useGrab from '../../hooks/useGrab';
import moment from 'moment';
const dummyData = [
  {
    title: "Paper 1",
    type: "Individual",
    date: new Date(),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  },
  {
    title: "Paper 2",
    type: "Group",
    date: new Date(),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  },
  {
    title: "Paper 3",
    type: "Individual",
    date: new Date(),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  },
  {
    title: "Paper 4",
    type: "Individual",
    date: new Date(),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  },
  {
    title: "Paper 5",
    type: "Individual",
    date: new Date(),
    due: new Date(),
    attempt: 3,
    score: 10,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  },
]

function Assignments() {
  const { data, error, loading } = useGrab({
    url: '/api/courses/:course_id/assignments/my'.replace(':course_id', useParams().courseid),
  }, localStorage.getItem('token'))
  const [assigned, setAssigned] = useState([])
  const [completed, setCompleted] = useState([])
  useEffect(()=>{
    if (!loading && !error && data) {
      setAssigned(data.filter(assignment => !assignment.completed).sort((a,b)=>{
        return moment(a.due).diff(moment(b.due))
      }))
      setCompleted(data.filter(assignment => assignment.completed))
    }
  }, [data])
  if (loading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>Error</div>
  }
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
      {/* left */}
      <div className="col-span-2">
      <h2 className="text-3xl font-bold my-4">Assignments</h2>
        <Tabs.Root className="TabsRoot" defaultValue="assigned">
        <Tabs.List className="TabsList mb-2" aria-label="Manage your account">
        <Tabs.Trigger className="p-2 border-b-4 aria-selected:border-sky-500 aria-selected:font-bold" value="assigned">
            Assigned
        </Tabs.Trigger>
        <Tabs.Trigger className="p-2 border-b-4 aria-selected:border-sky-500  aria-selected:font-bold" value="completed">
            Completed
        </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent flex flex-col gap-2" value="assigned">
          {assigned.map((assignment, index) => {
              return <AssignmentItem key={assignment._id} assignment={assignment}/>
          })}
          {assigned.length === 0 && <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
            <h5 className="text-xl">You do great!</h5> 
            <p>You finished all assignments!</p>
          </div>}
        </Tabs.Content>
        <Tabs.Content className="TabsContent flex flex-col gap-2" value="completed">
          {completed.map((assignment, index) => {
              return <AssignmentItem key={assignment._id} assignment={assignment}/>
          })}
          {completed.length === 0 && <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
            <h5 className="text-xl">Keep going!</h5> 
            <p>No completed assignment yet!</p>
          </div>}
        </Tabs.Content>
      </Tabs.Root>
      </div>
      <div className="col-span-1">
      <Due/>
      </div>
      </div>
      <Outlet/>
    </div>
  )
}

function AssignmentItem({assignment}){
  return <Link to={'./' + assignment._id + '/preview'}><div className="cursor-pointer p-2 border-2 bg-white border-slate-200 hover:border-sky-500 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-400 rounded-2xl ">
  <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-between">
    <div className="flex">
    <div className="icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
</svg>

    </div>
    <div className="title flex-1 font-bold">{assignment.assignment_name}</div>
    </div>
    {!assignment.submitted && <div className="detail flex flex-row justify-between items-center md:justify-start md:items-start md:flex-col border-t pt-2 md:border-t-0 md:border-l md:pt-0 md:pl-2 border-slate-200 dark:border-slate-700 space-x-2 md:space-x-0 md:space-y-2 md:w-64 lg:w-72">
      <div className="type flex space-x-2">
        <div className="type--icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
        </div>
        <div>{assignment.assignment_group ? assignment.assignment_group : "Individual"}</div>
      </div>
      <div className="due flex space-x-2">
        <div className="due--icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
        </div>
        <div>{(assignment.assignment_due ? moment(assignment.assignment_due).format('DD MMM YYYY, hh:mm') : "No due date")}</div>
      </div>
    </div>}
    {assignment.submitted && <div className="detail flex flex-row justify-between items-center md:justify-start md:items-start md:flex-col border-t pt-2 md:border-t-0 md:border-l md:pt-0 md:pl-2 border-slate-200 dark:border-slate-700 space-x-2 md:space-x-0 md:space-y-2 md:w-64 lg:w-72">
      <div className="due h-full flex items-center space-x-2">
        <div className="due--icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        </div>
        <div>{(assignment.submitted ? moment(assignment.submitted).format('DD MMM YYYY, hh:mm') : "No due date")}</div>
      </div>
    </div>}
  </div>
  </div>
  </Link>
}

function Due(){
  const { data, loading, error } = useGrab({
    url: '/api/courses/'+ useParams().courseid +'/assignments/due'
  }, localStorage.getItem('token'))
  console.log(data)
  return <>
        <h2 className="text-2xl font-bold my-4">Due in 24 hours</h2>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-2xl text-sm p-2 space-y-1">
          {loading && <div>Loading...</div>}
          {error && <div>Error</div>}
          {data && data.map((assignment, index) => <DueItem key={index} assignment={assignment}/>)}
          {data && data.length === 0 && <div className="text-slate-500 dark:text-slate-400 text-center my-2">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>
                </div>
                <h5 className="text-xl">Hooray!</h5>
                <p className="text-sm">No assignment due in next 24 hours</p>
                </div>}
        </div>
  </>
}

function DueItem({assignment}){
  return <Link to={assignment._id + '/preview'} rel="noreferrer noopener" className="rounded-lg cursor-pointer p-2 w-full flex space-x-2 hover:bg-slate-100 dark:hover:bg-slate-700 ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
    <div className="flex flex-col flex-1">
        <div className="font-bold">{assignment.assignment_name}</div>
        <div className="text-sm text-slate-500 group-hover:text-slate-700">{moment(assignment.assignment_due).fromNow()}</div>
    </div>
  </Link>
}

function Modal({data, show}){
  const backdropRef = useRef(null)
  const navigate = useNavigate();

  const handleBackDropClick = (e) => {
    if (e.target === backdropRef.current) {
      navigate('..', {replace: true})
    }
  }
  return <div ref={backdropRef} onClick={handleBackDropClick} className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center transition-opacity ${show ? 'visible opacity-100' : 'invisible opacity-50'}`}>
    <div className={`bg-white w-full max-w-[720px] max-h-screen divide-y divide-slate-200 rounded-xl transition-transform ${show ? 'translate-y-0' : 'translate-y-4'}`}>
      <div className="p-4 flex justify-between">
        <h5 className="font-bold text-lg">{data.title}</h5>
        <button onClick={()=>navigate('..', {replace: true})} className="p-1.5 hover:bg-slate-200 rounded focus:outline-none focus:ring-4 ring-gray-200 text-slate-500">
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="overflow-y-auto px-8 py-4">
        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Due Date</div>
                <div>{data.due ? data.due.toLocaleString('th-TH') : 'N/A'}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Attempt</div>
                <div>{data.attempt}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Group</div>
                <div>{data.type}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Score</div>
                <div>{data.score}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
            <div className="font-bold">Description</div>
            <p>{data.description}</p>
            </div>
            <div>
              <button className="w-full bg-slate-900 hover:bg-slate-800 rounded text-white px-4 py-2 bg-slate">Start Attempt</button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto p-4 text-slate-600 text-sm flex justify-between">
        <div>Posted on {data.date ? data.date.toLocaleString('th-TH') : ''}</div>
        <div className="inline-flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div className="font-medium">14</div>
      </div>
      </div>
    </div>
  </div>
}


export default Assignments