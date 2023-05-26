import moment from "moment/moment"
import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useParams, useNavigate, Navigate, Link } from "react-router-dom"

import useGrab from "../../hooks/useGrab"

import Score from "../../components/Score/Score";


function AssignmentsPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const { courseid, asgn_id } = useParams()
  const navigate = useNavigate()
  const onClose = () => {
      setIsOpen(false)
      setTimeout(()=>navigate("..", { replace: true }), 200)
  }
  const [asgn, setAsgn] = useState(null)
  const { data, loading, error } = useGrab({
    url: '/api/courses/:course_id/assignments/:asgn_id'.replace(':course_id', courseid).replace(':asgn_id', asgn_id),
  }, localStorage.getItem('token'))
  useEffect(() => {
    if (!loading && !error && data) {
      setAsgn(data)
      setIsOpen(true)
    }
  }, [data])
  console.log(asgn)
  return (
    asgn && <Transition appear show={isOpen} as={Fragment}>
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
            <div className="flex min-h-full items-center justify-center p-2 text-center">
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
                      className="text-xl font-bold mb-4"
                    >
                        {asgn.assignment_name}
                    </Dialog.Title>
                  <div className="grid md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 order-2 md:order-1 text-sm md:text-base">
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-medium">Due Date</div>
                <div>{asgn.assignment_due ? moment(asgn.assignment_due).format('D MMM YYYY, HH:mm') : 'N/A'}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-medium">Attempt</div>
                <div>{asgn.assignment_attempt > 0 ? '1 attempt' : 'Unlimited'}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-medium">Group</div>
                <div>{asgn.assignment_group ? asgn.assignment_group : 'Individual'}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              </div>
              {asgn.my && <div className="flex flex-col">
                <div className="font-medium">Optained Score</div>
                <div>{asgn.assignment_score ? <Score score={asgn.my.feedback.score} max={asgn.assignment_score} show={asgn.my.feedback.show}/> : 'Not scored'}</div>
              </div>}
              {(!asgn.my) && <div className="flex flex-col">
                <div className="font-medium">Maximum Score</div>
                <div>{asgn.assignment_score ? asgn.assignment_score : 'Not scored'}</div>
              </div>}
            </div>
            <div className="block md:hidden col-span-2">
              {asgn.my && asgn.my.feedback.comment && <div className="text-center">Feedback Available!</div>}
              <Link className="block" to="./../worksheet" replace><button type="button" className="w-full bg-slate-900 hover:bg-slate-800 rounded text-white px-4 py-2 bg-slate">{asgn.my ? "View your submission" : "Start Attempt" }</button></Link>
            </div>
          </div>
          <div className="flex flex-col justify-between order-1 md:order-2">
            <div className="flex-1 pb-2 mb-2 border-b border-slate-200">
            <div className="mb-2">
              <div className="font-medium">Description</div>
              <p className="max-h-32 md:max-h-40 overflow-auto">{asgn.assignment_description}</p>
            </div>
            </div>
            <div className="hidden md:block">
              {asgn.my && asgn.my.feedback.comment && <div className="text-center">Feedback Available!</div>}
              <Link className="block" to="./../worksheet" replace><button type="button" className="w-full bg-slate-900 hover:bg-slate-800 rounded text-white px-4 py-2 bg-slate">{asgn.my ? "View your submission" : "Start Attempt" }</button></Link>
            </div>
          </div>
        </div>
                  {/* <p><button type="button" onClick={onClose} className="text-slate-500 hover:underline">Close</button></p> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default AssignmentsPreview