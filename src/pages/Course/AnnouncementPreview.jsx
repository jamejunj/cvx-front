import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import moment from 'moment/moment'
import useGrab from '../../hooks/useGrab'
function AnnouncementPreview() {
    const [isOpen, setIsOpen] = useState(true)
    const { courseid, announcement_id } = useParams()
    const navigate = useNavigate()
    const { data, error, loading } = useGrab({
        url: '/api/courses/'+ courseid +'/announcements/' + announcement_id,
        method: 'GET',
        body: {}
    }, '')
    if (loading){
        return <></>
    }
    if (error){
        alert('Internal Server Error');
        return <Navigate to={'../../home'} replace/>;
    }
    const announce = data
    const onClose = () => {
        setIsOpen(false)
        setTimeout(()=>navigate('../../home', { replace: true }), 200)
    }
    if (!loading && !announce) {
      return <Navigate to={'../../home'} replace/>;
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
                  <Dialog.Panel className="relative w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <button onClick={onClose} className="absolute right-4 top-4 p-1.5 hover:bg-slate-200 rounded text-slate-500">
                        <span className="sr-only">Close</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    <div className="px-6 py-6">
                    <Dialog.Title
                      as="h5"
                      className="text-lg font-bold mb-4"
                    >
                        {announce.announcement_title}
                    </Dialog.Title>
                    <div className="break-all">{announce.announcement_content}</div>
                    <p className="mt-6 text-sm text-slate-600">Posted on {moment(announce.announcement_datetime).format('D MMM, YYYY')}</p>
                    </div>
                    
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    )
}

export default AnnouncementPreview