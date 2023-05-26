import { useParams } from "react-router-dom"
import useGrab from "../../hooks/useGrab"

function Instructor({name, status, email, imgURL="https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"}){
    return <div className="flex space-x-2">
        <img src={imgURL} alt={name} className="w-12 h-12 border-2 border-white rounded-full" />
        <div className="flex-1">
            <h5 className="font-bold">{name}</h5>
            <p className="text-slate-500 dark:text-gray-400">{status}</p>
        </div>
        {email && <a href={"mailto:" + email}><div className="text-slate-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        </div></a>}
    </div>
}

function AboutCourse() {
    const courseid = useParams().courseid
    const {data, error, loading} = useGrab({
        url: '/api/courses/' + courseid,
        method: 'GET',
        body: {}
    }, '')
    if (loading) return <div>Loading</div>
    if (error) return <Error error={"Data Fetch Error"} message={"Data Fetch Error"} />
    const course = data
  return (
    <div className="container mx-auto p-4">
        <h2 className="font-bold text-3xl my-4">About Course</h2>
        {/* <hr className="border-b border-slate-200 my-2"/>
        <h3 className="text-2xl my-4 font-bold">Instructor</h3>
        <div className="flex flex-col gap-2">
            <Instructor name="Somchai Prasit" status="Instructor"/>
        </div>
        <hr className="border-b border-slate-200 my-2"/>*/}
        {/* <h3 className="text-2xl my-4 font-bold">Course Information</h3> */}
        <dl className="bg-white dark:bg-slate-800 rounded-2xl border-slate-200 text-sm">
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Course ID</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0">{course.course_code}</dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Course Name</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0">{course.course_name}</dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Course Objective</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0">
                <ul className="list-disc list-inside">
                    {course.course_objective?.map((obj, index) => <li key={index}>{obj}</li>)}
                </ul>
            </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Instructor</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0 space-y-2">
                {course.course_instructors?.map((ins, index) => <Instructor key={index} name={[ins.title,ins.first,ins.last].join(' ')} status={ins.role} imgURL={ins.img} email={ins.email}/>)}
            </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Course Contact</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0 space-y-2">
                <div className="space-x-2">
                {course.course_contact?.facebook && <a href={course.course_contact.facebook} target="_blank" rel="noopener noreferer">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Facebook</button>
                </a>}
                {course.course_contact?.team && <a href={course.course_contact.team} target="_blank" rel="noopener noreferer">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Team</button>
                </a>}
                {course.course_contact?.echo && <a href={course.course_contact.echo} target="_blank" rel="noopener noreferer">
                    <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">Echo360</button>
                </a>}
                {(!course.course_contact?.facebook && !course.course_contact?.team  && !course.course_contact?.echo) && <p className="text-slate-500 dark:text-slate-400 italic">No Contact</p>}
                </div>
            </dd>
            </div>
        </dl>
    </div>
  )
}

export default AboutCourse