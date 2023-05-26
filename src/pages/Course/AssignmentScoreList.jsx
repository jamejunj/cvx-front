import React from 'react'

function AssignmentScoreList() {
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
  return (
    <div>AssignmentScoreList</div>
  )
}

export default AssignmentScoreList