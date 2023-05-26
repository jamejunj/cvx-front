import { Transition } from "@headlessui/react"
import { useEffect, useState } from "react"
import { useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

const meeting_detail = [
  {},
  {
    "meeting_id": "1",
    "meeting_name": "DEMO.UXUI.001 (2022/1) Online Session on 29-Jan-2023",
    "meeting_start": "2023-01-29T09:00:00+08:00",
    "meeting_end": "2023-01-29T10:00:00+08:00",
    "meeting_host": "Alex Sus", 
  }
]

function MeetingPreview() {
  const [isOpen, setIsOpen] = useState(true)
  const { meeting_id } = useParams()
  const navigate = useNavigate()
  const backdrop = useRef()
  const close = async () => {
    setIsOpen(false)
    await setTimeout(()=>navigate(-1, { replace: true }), 200)
  }
  useEffect(()=>{
    if (!meeting_detail[meeting_id]) {
      close()
    }else{
      setIsOpen(true)
    }
  }, [])
  const backdropClick = (e) => {
    if (backdrop.current === e.target) {
      close()
    }
  } 
  return (
    <Transition appear show={isOpen} 
      enter="transition ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
    <div ref={backdrop} onClick={backdropClick} className="z-20 fixed inset bg-opacity-50 bg-black top-0 left-0 flex items-start justify-center">    </div>

      <div className="bg-white w-full max-w-[720px] flex flex-col rounded-2xl overflow-hidden mt-16">
        <div className="h-48 bg-gradient-to-br from-sky-500 to-sky-300 flex items-center justify-center">
          <img className="w-24 h-24" src="https://www.mycourseville.com/sites/all/modules/courseville/inc_meeting/pict/zoomlogo.svg" alt="" />
        </div>
        <div className="p-4 text-center">
          <h5 className="font-bold mb-2">{meeting_detail[meeting_id].meeting_name}</h5>
          <p>{meeting_detail[meeting_id].meeting_start}</p>
          <p>Hosted by {meeting_detail[meeting_id].meeting_host}</p>
          <a href="http://join.zoom.us/"><button className="mt-8 mb-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-white px-4 py-2">Join the meeting</button></a>
          <p><Link to={-1} replace className="text-slate-500 hover:underline">Close</Link></p>
        </div>
      </div>
    </Transition>
  )
}

export default MeetingPreview