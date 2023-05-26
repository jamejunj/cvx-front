import AnnouncementItem from '../../components/Announcement/AnnouncementItem'
import useGrab from '../../hooks/useGrab'
import { useParams } from 'react-router-dom'

function Announcements() {
    const { data, loading, error } = useGrab({
        url: '/api/courses/:course_id/announcements/'.replace(':course_id', useParams().courseid),
        method: 'GET',
        body: {}
      }, '')
      if (loading) {
        return <div>Loading</div>
      }
  return (
    <>
    <h2 className="text-3xl font-bold my-4">Announcements</h2>
          <div className="flex space-x-2 flex-nowrap overflow-x-auto p-2">
           {data.map((announcement, index) => {
              return <AnnouncementItem key={announcement._id} id={announcement._id} title={announcement.announcement_title} date={new Date(announcement.announcement_datetime)}/>
           })}
           {data.length === 0 && <div className="text-gray-500">No announcements</div>}
          </div>
    </>
  )
}

export default Announcements