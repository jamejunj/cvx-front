import GlobalActivitiesItem from './GlobalActivitiesItem'
import useGrab from '../../hooks/useGrab'

import { useEffect, useState } from 'react'


function GlobalActivities() {
  const { data, error, loading } = useGrab({
    url: '/api/courses/upcoming',
    }, localStorage.getItem('token'), [])
  const [activities, setActivities] = useState([])
  useEffect(() => {
    if (data && data.length > 0) {
      setActivities(data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime)))
    }
    }, [data])
  if (!error && !loading && data.length===0) return null
  return (
    <div className="my-4 flex items-center">
        <h1 className="max-sm:text-xl font-bold text-3xl mb-4 pr-2">Upcoming</h1>
        <div className="flex w-full snap-proximity snap-x flex-nowrap space-x-2 overflow-x-auto p-2">
            {loading && <>
            <GlobalActivitiesSkeleton/>
            <GlobalActivitiesSkeleton/>
            <GlobalActivitiesSkeleton/>
            <GlobalActivitiesSkeleton/>
            </>}
            {error && <div>Error</div>}
            {activities && activities.map((item, index) => <GlobalActivitiesItem 
            key={index}
            activity={{
                type: item.type,
                course: {
                    id: item.course_code,
                    name: item.course_name,
                    short: item.course_name,
                    img: item.course_image
                },
                event: {
                    name: item.title,
                    datetime: new Date(item.datetime),
                    location: item.location,
                }
            }}/>)}
        </div>
    </div>
  )
}

function GlobalActivitiesSkeleton(){
  return <div className="relative lock cursor-pointer snap-center shrink-0 grow-0 w-72 h-32 bg-slate-300 animate-pulse shadow-slate-200 rounded-2xl shadow-md overflow-hidden">
  <div className="absolute inset-0  p-2">
     <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 text-sm space-y-2">
           <p className="w-16 h-2 bg-slate-400 rounded-full"></p>
           <p className="w-16 h-2 bg-slate-400  rounded-full"></p>
        </div>
        <div className="absolute top-0 right-2 text-2xl inline-flex flex-col items-center space-y-2">
          <p className="w-8 h-6 bg-slate-400  rounded-lg"></p>
          <p className="w-12 h-6 bg-slate-400  rounded-lg"></p>
        </div>
        <div className="absolute bottom-0 left-0 font-bold inline-flex items-center  space-y-2">
           <p className="w-32 h-4 bg-slate-400  rounded-full"></p>
        </div>
     </div>
  </div>
</div>
}

export default GlobalActivities