import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import moment from 'moment'
function File(props) {
  const data = props.content
  const [open, setOpen] = useState(false)
  const handleFolder = () => {
    setOpen(!open)
  }
  if (!data.children) {
  return (
    <div className="flex items-center space-x-2">
      <a href={ data.file_path } target="_blank" rel="noreferrer noopener" className="rounded-lg cursor-pointer p-2 w-full flex space-x-2 hover:bg-slate-200 dark:hover:bg-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <div className="flex flex-col flex-1">
            <div className="font-bold">{data.file_name}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{moment(data.file_upload_datetime).fromNow()}</div>
        </div>
    </a>
    <Link to={'../content/'+ data._id +'/view'} className="rounded-full w-8 h-8 hover:bg-slate-200 dark:hover:bg-slate-700 inline-flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
    </Link>
    </div>
    
  )
  }else{
    return <>
    <div onClick={handleFolder} className="group rounded-lg cursor-pointer p-2 w-full flex space-x-2 hover:bg-slate-200 dark:hover:bg-slate-700">
        {!open ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg>}
        <div className="flex flex-col flex-1">
            <div className="font-bold">{data.file_name}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{moment(data.file_upload_datetime).fromNow()}</div>
        </div>
        <div>

        </div>
    </div>
    <Transition
      show={open}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-100"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
    <div className={"ml-8 transition-navbar overflow-hidden max-h-fit opacity-100 translate-x-0"}>
        {data.children.map((item, index)=>{
            return <File content={item} key={index} />
        })}
    </div>
    </Transition>
    
    </>
  }
}

// const __bkup = <div className={"ml-8 transition-navbar overflow-hidden " + (open ? 'max-h-fit opacity-100 translate-x-0' : 'max-h-0 opacity-0 -translate-x-10 ')}>
// {data.children.map((item, index)=>{
//     return <File content={item} key={index} />
// })}
// </div>

export default File