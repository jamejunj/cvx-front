import { useParams, Link } from 'react-router-dom'
import useGrab from '../../hooks/useGrab'

import moment from 'moment'

function Discussion() {
    const { data, error, loading} = useGrab({
        url: '/api/courses/' + useParams().courseid + '/discussions/',
    })
  return (
    <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold my-4">Discussion</h2>
        {loading && <div>Loading...</div>}
        {error && <div>Error</div>}
        <div className="space-y-2">
        {data && data.map((item, index) => {
            return <DiscussionTopic topic={item} key={index}/>
        })}
        {data && data.length===0 && <div className="flex flex-col">
            <div className="text-center text-slate-500 dark:text-slate-400 text-xl">No discussions yet</div>
            <div className="text-center text-slate-500 dark:text-slate-400">This course currently have no discussion</div>
        </div>}
        </div>
    </div>
  )
}

function DiscussionTopic({topic}){
    return <Link to={'./' + topic._id} className="p-2 block rounded-2xl cursor-pointer border-2 bg-white border-slate-200 hover:border-sky-500 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-400">
            <div className="flex space-x-2">
                <div className="icon p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                </div>
                <div className="flex flex-col space-y-1">
                    <h5 className="font-bold text-xl">{topic.discussion_title}</h5>
                    <div className="start flex space-x-2 text-slate-900 dark:text-slate-200">
                        <div className="start--icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                        </div>
                        <div>{moment(topic.discussion_datetime).format('DD MMM YYYY, hh:mm')}</div>
                    </div>
                </div>
            </div>
        </Link>
}

export default Discussion