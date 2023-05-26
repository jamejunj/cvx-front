import { Link } from 'react-router-dom'
import Kind from '../../utils/Kind'

function GlobalActivitiesItem({activity}) {
  return (
    <Link to={activity.event.location} className="relative lock cursor-pointer snap-center shrink-0 grow-0 w-72 h-32 bg-gradient-to-tr from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500  text-white rounded-2xl overflow-hidden">
                <img className="object-cover" src={activity.course.img} alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.4)] hover:from-[rgba(0,0,0,0.8)] hover:to-[rgba(0,0,0,0.4)]  p-2">
                <div className="relative w-full h-full">
                    <div className="absolute top-0 left-0 text-sm">
                        <p>{activity.course.id}</p>
                        <p>{activity.course.short}</p>
                    </div>
                    <div className="absolute top-0 right-2 text-2xl text-center font-bold">
                        <p>{activity.event.datetime.toLocaleString('en-GB', {
                            day: '2-digit'
                        })}</p>
                        <p>{activity.event.datetime.toLocaleString('en-GB', {
                            month: 'short'
                        })}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 font-bold inline-flex items-center space-x-1">
                        <p><Kind type={activity.type}/></p>
                        <p>{activity.event.name}</p>
                    </div>
                </div>
                </div>
    </Link>
  )
}



export default GlobalActivitiesItem