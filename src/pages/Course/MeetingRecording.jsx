import { Transition, Dialog } from "@headlessui/react"
import { useEffect, useState, Fragment } from "react"
import { useParams, useNavigate, Link, Navigate } from "react-router-dom"
import useGrab from "../../hooks/useGrab"
import moment from "moment"

function MeetingRecording(){
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  const onClose = () => {
      setIsOpen(false)
      setTimeout(()=>navigate('..', { replace: true }), 200)
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
      return <Navigate to={'..'} replace/>;;
  }
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
                  <Dialog.Panel className="w-full p-2 max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <div className="p-4">
                    <Dialog.Title
                      as="h5"
                      className="text-lg font-bold mb-4"
                    >
                      Recording for Introduction (Online Session)
                    </Dialog.Title>
                    <div className="flex flex-col space-y-2">
                    {meeting.meeting_recording?.password && <div className="p-4 rounded-lg  bg-slate-100 flex justify-between">
                      <div className="font-medium">Recording Password</div>
                      <div>
                      {meeting.meeting_recording.password}
                      </div>
                    </div>}
                    {meeting.meeting_recording?.video && <div className="p-4 rounded-lg bg-slate-100 flex justify-between">
                      <div className="font-medium">Video</div>
                      <div className="flex space-x-2">
                        <a href={meeting.meeting_recording.video} target="_blank" className="flex space-x-1 hover:underline font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                        </svg>
                        <span>Play</span>
                        </a>
                        <a href={meeting.meeting_recording.video} target="_blank" download className="flex space-x-1 hover:underline font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span>Download</span>
                        </a>
                      </div>
                    </div>}
                    {meeting.meeting_recording?.audio && <div className="p-4 rounded-lg bg-slate-100 flex justify-between">
                      <div className="font-medium">Audio Only</div>
                      <div className="flex space-x-2">
                        <a href={meeting.meeting_recording.audio} className="flex space-x-1 hover:underline font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                        </svg>
                        <span>Play</span>
                        </a>
                        <a href={meeting.meeting_recording.audio} download className="flex space-x-1 hover:underline font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span>Download</span>
                        </a>
                      </div>
                    </div>
                    }
                    </div>
                    <p className="text-slate-600 text-sm my-2">Valid till: {moment(meeting.meeting_recording?.expire).format('DD MMM YYYY, hh:mm')}</p>
                    <div className="text-center">
                    <p><button type="button" onClick={onClose} className="text-slate-500 hover:underline">Close</button></p>
                    </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    )
  }
  
export default MeetingRecording