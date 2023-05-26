import { Transition, Dialog } from "@headlessui/react"
import { useEffect, useState, Fragment } from "react"
import { useParams, useNavigate, Link, useOutletContext } from "react-router-dom"
import useGrab from "../../hooks/useGrab"
import moment from "moment"

function MeetingPreviewDialog(){
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()
    const onClose = () => {
        setIsOpen(false)
        setTimeout(()=>navigate(-1, { replace: true }), 200)
    }
    const { courseid, meeting_id } = useParams()
    const { data, loading, error } = useGrab({
        url: `/api/courses/${courseid}/meetings/${meeting_id}`,
        method: 'GET',
    })
    if (loading){
      return <></>
    }
    if (error){
        alert('Internal Server Error');
        return <Navigate to={'..'} replace/>;
    }
    const meeting = data
    if (!loading && !meeting){
        return <Navigate to={'..'} replace/>;
    }
    const { course } = useOutletContext()
    return (
      <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-center align-middle shadow-xl transition-all">
                    <div className="relative overflow-hidden h-48">
                    <img className="w-full h-full object-cover" src={course.course_image} alt="" />
                    <div className="absolute w-full h-full top-0 z-20 flex items-center justify-center">
                    <img className="w-24 h-24" src="https://www.mycourseville.com/sites/all/modules/courseville/inc_meeting/pict/zoomlogo.svg" alt="Zoom" />
                    </div>
                    </div>
                    <div className="p-4">
                    <Dialog.Title
                      as="h5"
                      className="text-lg font-medium mb-2"
                    >
                      {meeting.meeting_title}
                    </Dialog.Title>
                    <p>{moment(meeting.meeting_start).format('DD MMM YYYY, hh:mm')}</p>
                    <p>Hosted by {meeting.meeting_host}</p>
                    <a href={meeting.meeting_link}><button className="mt-8 mb-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-white px-4 py-2">Join the meeting</button></a>
                    <p><button type="button" onClick={onClose} className="text-slate-500 hover:underline">Close</button></p>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    )
  }
  
export default MeetingPreviewDialog