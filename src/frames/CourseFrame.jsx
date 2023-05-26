import React from 'react'
import CourseNavbar from '../components/CourseNavbar/CourseNavbar'
import { Outlet, useParams } from 'react-router-dom'

import useGrab from '../hooks/useGrab'
import Error from '../pages/Error'

function CourseFrame() {
    const {courseid} = useParams()
    const {data, error, loading} = useGrab({
        url: '/api/courses/' + courseid,
        method: 'GET',
        body: {}
    }, '')
    if (loading) {
        return <div>Loading</div>
    }
    if (error) {
        console.log(error)
        return <div>Error</div>
    }
    if (!data){
        return <Error error="Course not found" message="Please go back to the course page"/>
    }
  return (
    <div>
        <CourseNavbar id={data.course_id} name={data.course_name_short} img={data.course_image}/>
        <Outlet context={{course: data}}/>
    </div>
  )
}

export default CourseFrame