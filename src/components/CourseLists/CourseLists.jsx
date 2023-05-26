import CourseItem from "./CourseItem"

import useGrab from "../../hooks/useGrab"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom" 

function getCurrentSemester(){
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

function CourseLists() {
    const auth = useContext(AuthContext)
    const [courseList, setCourseList] = useState([])
    const [defalultYear, defaultSemester] = getCurrentSemester()
    const [filteredCourseList, setFilteredCourseList] = useState([])
    const {data, error, loading} = useGrab({
        url: `/api/courses/my`,
        method: 'GET',
        body: {}
    }, auth.token)
    useEffect(()=>{
        if (data) {
            setCourseList(data)
            setFilteredCourseList(data.filter(course => course.course_academic_year === '' + defalultYear && course.course_semester === '' + defaultSemester))
        }
    }, [data])
    const changeSemester = (e) => {
        const [year, semester] = e.target.value.split('/')
        setFilteredCourseList(courseList.filter(course => course.course_academic_year === '' + year && course.course_semester === '' + semester))
    }
  return (
    <>
    <div className="my-4">
        <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-4">My Courses</h1>
        <div className="flex items-center space-x-2">
            <Link to="/join">
            <button className="flex text-sky-700 dark:text-sky-400 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>Join new course</div>
            </button>
            </Link>
            {!loading && !error && courseList && courseList.length > 0 && <select className="px-4 py-2 rounded border border-slate-200 dark:border-transparent dark:bg-slate-800 dark:focus:bg-slate-700" onChange={changeSemester}>
                {[...new Set(courseList.map(course => course.course_academic_year + '/' + course.course_semester))].sort((a,b)=>{
                    return ('' + b).localeCompare(a)
                }).map((semester, index) => {
                    return <option key={index} value={semester}>{semester}</option>
                })}
            </select>}
        </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {loading && <>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </>}
            {!error && !loading && filteredCourseList?.map((course, index) => {
                return <CourseItem key={index} course={course}/>
            })}
        </div>
    </div>
    {!loading && !error && data && data.length === 0 && <div className="text-slate-500 dark:text-slate-400 text-center my-2">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>
                </div>
                <h5 className="text-xl">Joined courses will available here!</h5>
                <p className="text-sm">If you want to enroll to course please <Link className="underline hover:no-underline" to="/join">Join new courses</Link></p>
    </div>}
    </>
  )
}

function Skeleton(){
    return (
        <div className="h-72 bg-slate-300 rounded-2xl animate-pulse">
            <div className="h-32"></div>
            <div className="p-4">
                <div className="space-y-2">
                    <p className="h-6 w-full bg-slate-400 rounded-full"></p>
                    <p className="h-2 w-32 bg-slate-400 rounded-full"></p>
                    <p className="h-16"></p>
                    <p className="h-2 w-32 bg-slate-400 rounded-full"></p>
                </div>
                
            </div>
        </div>
    )
}

export default CourseLists