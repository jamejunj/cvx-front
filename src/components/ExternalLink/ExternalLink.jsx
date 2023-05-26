import { useState } from 'react'
import { Link } from 'react-router-dom'

function ExternalLink(props) {
  const data = props.link
  return (
    <a href={data.link_url} target="_blank" rel="noreferrer noopener" className="rounded-lg cursor-pointer p-2 w-full flex space-x-2 hover:bg-slate-200 dark:hover:bg-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>

        <div className="flex flex-col flex-1">
            <div className="font-bold">{data.link_name}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700">{data.link_description}</div>
        </div>
    </a>
  )
}

export default ExternalLink