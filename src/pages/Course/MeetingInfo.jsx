import { Transition, Dialog } from "@headlessui/react"
import moment from "moment"
import { useState, Fragment } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import useGrab from "../../hooks/useGrab"

function MeetingInfo(){
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  const onClose = () => {
      setIsOpen(false)
      setTimeout(()=>navigate("..", { replace: true }), 200)
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
                      Meeting Information
                    </Dialog.Title>
                    <div className="flex flex-col space-y-2">
                    <dl className="bg-white rounded border-slate-200 text-sm">
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="font-medium text-gray-500">Meeting ID</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0">{meeting._id}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="font-medium text-gray-500">Meeting Provider</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0">Zoom</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="font-medium text-gray-500">Hosted By</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0">{meeting.meeting_host}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="font-medium text-gray-500">Scheduled on</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0">{moment(meeting.meeting_start).format('YYYY, MMM D on HH:mm')}</dd>
                    </div>
                    </dl>
                    </div>
                    <div className="text-center">
                    <p className="mt-2"><button type="button" onClick={onClose} className="text-slate-500 hover:underline">Close</button></p>
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

export default MeetingInfo