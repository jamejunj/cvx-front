import * as Tabs from '@radix-ui/react-tabs'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useGrab from '../hooks/useGrab'
import axios from 'axios'

import { ConfirmDialog } from '../components/Dialog/Dialog'
import useAuthentication from '../hooks/useAuthentication'

function getDefault(){
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  if (month <= 5) {
    return [year-1, 2]
  }
  if (month <= 7) {
    return [year-1, 3]
  }
  return [year, 1]
}

function Join() {
  const { user, loading, error } = useAuthentication()
  const [search, setSearch] = useState("")
  const [year, sem] = getDefault()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const handleSearch = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const searchParams = new URLSearchParams()
    searchParams.set("search", data.get("course_no"))
    searchParams.set("year", data.get("year"))
    searchParams.set("semester", data.get("sem"))
    if (data.get("course_no")){
      setSearch(searchParams)
    }else{
      setSearch("")
    }
  }
  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">Join</h1>
        <Tabs.Root className="TabsRoot" defaultValue="student">
        <Tabs.List className="TabsList mb-2" aria-label="Manage your account">
        <Tabs.Trigger className="p-2 border-b-4 aria-selected:border-sky-500 aria-selected:font-bold" value="student">
            Student
        </Tabs.Trigger>
        <Tabs.Trigger className="p-2 border-b-4 aria-selected:border-sky-500  aria-selected:font-bold" value="instructor">
            Instructor
        </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent flex flex-col gap-2" value="student">
          <form onSubmit={handleSearch}>
          <div className="font-medium text-lg">Search for a course</div>
          <div>
            <label htmlFor="course_no">Course Number</label>
            <input name="course_no" type="text" className="block rounded w-full dark:bg-slate-700 dark:focus:bg-slate-600 dark:border-transparent  px-4 py-2 outline-none border-2 border-slate-200 focus:border-sky-500" placeholder="Enter course number" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="year">Year</label>
              <input name="year" type="number" step={1} className="block rounded w-full dark:bg-slate-700 dark:focus:bg-slate-600 dark:border-transparent  px-4 py-2 outline-none border-2 border-slate-200 focus:border-sky-500" defaultValue={year} min={2009} max={year} />
            </div>
            <div>
              <label htmlFor="sem">Semesters</label>
              <input name="sem" type="number" step={1} className="block rounded w-full dark:bg-slate-700 dark:focus:bg-slate-600 dark:border-transparent  px-4 py-2 outline-none border-2 border-slate-200 focus:border-sky-500" defaultValue={sem} min={1} max={3} />
            </div>
          </div>
          <div className="my-2">
            <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white rounded px-4 py-2">Search</button>
          </div>
          </form>
          {search!=="" ? <SearchResult search={search} uid={user._id} token={user.token}/> : null}
        </Tabs.Content>
        <Tabs.Content className="TabsContent flex flex-col gap-2" value="instructor">
          <div>
            <label htmlFor="instructor_code">Instructor code</label>
            <input type="text" className="block rounded w-full dark:bg-slate-700 dark:focus:bg-slate-600 dark:border-transparent px-4 py-2 outline-none border-2 border-slate-200 focus:border-sky-500" />
          </div>
          <div>
            <label htmlFor="instructor_password">Instructor Invitation Password</label>
            <input type="text" className="block rounded w-full dark:bg-slate-700 dark:focus:bg-slate-600 dark:border-transparent  px-4 py-2 outline-none border-2 border-slate-200 focus:border-sky-500" />
          </div>
          <div>
            <button type="button" className="bg-sky-500 hover:bg-sky-700 text-white rounded px-4 py-2">Register</button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
      </div>
    </div>
  )
}

function SearchResult({search, uid, token}){
  const {data, error, loading} = useGrab({
    url: '/api/courses/find?' + search.toString(),
  })
  console.log('/api/courses/find?' + search.toString(),)
  return <div className="p-4 flex flex-col space-y-2">
    {loading && <div>Loading...</div>}
    {error && <div>Error</div>}
    {!loading && !error && data && data.map((course) => <CourseSearchItem course={course} token={token} uid={uid}/>)}
    {!loading && !error && data && data.length==0 ? <div>Course not Found</div> : null}
  </div>
}

function CourseSearchItem({course, uid, token}){
  const navigate = useNavigate()
  const [alert, setAlert] = useState({})
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [dialogData, setDialogData] = useState({})
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form_data = new FormData(e.target)
    const data = Object.fromEntries(form_data)
    data["course_id"] = course.course_id
    try {
      const res = await axios.post(import.meta.env.VITE_SERVER + "/api/courses/join", data, {
      headers: {
        "Authorization": token
      },
    })
    if (!res.data.error){
      setDialogData({
        title: "Success",
        content: "You successfully join the course!",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
        onClose: ()=>{setShowConfirmDialog(false)},
        onCloseText: "Join another course",
        onConfirm: ()=>{
          navigate("/course/"+course.course_id)
        },
        onConfirmText: "Go to course"
      })
      setShowConfirmDialog(true)
    }else{
      setDialogData({
        title: "Error",
        content: "Incorrect Password!",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>,
        onClose: ()=>{setShowConfirmDialog(false)},
        onCloseText: "Close",
      })
      setShowConfirmDialog(true)
    }
    } catch (err){
      console.log(err)
      setShowConfirmDialog(true)
      setDialogData({
        title: "Error",
        content: "Incorrect Password!",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>, 
        onClose: ()=>{setShowConfirmDialog(false)},
        onCloseText: "Close",
      })
    }
  }
  const joined = course.course_roster.some((user)=>user._id === uid);
  return <div className={`group border-slate-200 dark:border-transparent bg-white dark:bg-slate-800 border-2 rounded-2xl transition-all duration-100 flex flex-col gap-2 overflow-hidden `}>
  <div className="flex flex-col items-center">
      <div className="h-32 overflow-hidden w-full bg-sky-200">
        <img className="object-cover h-full w-full" src={course.course_image} alt="" />
      </div>
      <div className="w-full p-4 overflow-hidden">
          <div className="font-bold text-lg overflow-hidden whitespace-nowrap text-ellipsis">{course.course_name}</div>
          <div className="text-slate-500">{course.course_code}</div>
          <div className="flex flex-col justify-between space-y-2">
                <div className="text-sm">
                    {course.course_instructors.length > 1 ? course.course_instructors.map(instructor=>(instructor.first)).slice(0,1).join(', ') + (course.course_instructors.length > 1 ? ' and ' + (course.course_instructors.length-1) + ' more' : '') : course.course_instructors[0].first + ' ' + course.course_instructors[0].last }
                </div>
                {alert && <div className={alert.className}>{alert.textContent}</div>}
                {!joined && <form onSubmit={handleSubmit}>
                <div className="w-full flex -space-x-0.5 rounded overflow-hidden border-2 border-slate-200 focus-within:border-sky-500 dark:border-transparent">
                  <input name="course_password" type="text" placeholder="Course password" className="block w-full dark:bg-slate-700 dark:focus:bg-slate-600 px-4 py-2 outline-none" />
                  <button className="px-4 py-2 text-white bg-sky-500 hover:bg-sky-700">Join</button>
                </div>
                </form>}
                {joined && "You already join this course"}
          </div>
      </div>
  </div>
  <ConfirmDialog 
            title={dialogData.title}
            open={showConfirmDialog} 
            onClose={dialogData.onClose} 
            onCloseText={dialogData.onCloseText}
            onConfirm={dialogData.onConfirm}
            onConfirmText={dialogData.onConfirmText}
          >
          <div className="flex flex-col items-center">
          {dialogData.icon}
          <p>{dialogData.content}</p>
          </div>
  </ConfirmDialog>
</div>
}

export default Join