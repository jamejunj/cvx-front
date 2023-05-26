import { Link, useParams, Navigate } from "react-router-dom"
import { useState } from "react"
import moment from "moment"

import useGrab from "../../hooks/useGrab"

function FileView() {
  const { courseid, content_id } = useParams()
  const { data, loading, error } = useGrab({
      url: "/api/courses/" + courseid + '/contents/' + content_id,
      method: "GET",   
  })
  if (loading){
    return <></>
  }
  if (error){
      alert('Internal Server Error');
      return <Navigate to={'./../..'} replace/>;
  }
  if (!loading && !data){
      return <Navigate to={'./../..'} replace/>;
  }
  console.log(data)
  return (
    <div className="container mx-auto p-4">
      <Link class="inline-flex p-2 space-x-2 text-slate-800 dark:text-slate-200 hover:underline focus:bg-gray-200" to="./../.."><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path></svg><div>Back</div></Link>
        <h1 className="text-3xl font-bold my-4">Content Detail</h1>
        <dl className="bg-white dark:bg-slate-800 rounded border-slate-200 text-sm">
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">File Name</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0">{ data.file_name }</dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">File Description</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0">{ data.file_description }</dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Upload Date</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0">
                {moment(data.file_upload_datetime).subtract(1, 'days').format('DD MMM, YYYY. HH:mm')}
            </dd>
            </div>
            {data.file_update_datetime && <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Last Update Date</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0">
                { moment(data.file_update_datetime).format('DD MMM, YYYY. HH:mm')}
            </dd>
            </div>}
            {/* <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500">Uploadted by</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0 space-y-2">
                <Instructor name="Dittaya Wanvarie" status="Instructor" imgURL="https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Dittaya-Wanvarie-1-5.jpg"/>
            </dd>
            </div> */}
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Download</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0 space-y-2">
                <a className="underline hover:text-sky-500" href={data.file_path} download={data.file_name}>Download</a>
            </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="font-medium text-gray-500">Preview</dt>
            <dd class="mt-1 sm:col-span-2 sm:mt-0 space-y-2">
                <Preview src={data.file_path}/>
            </dd>
            </div>
        </dl>
    </div>
  )
}

function Preview({src}){
  const [show, setShow] = useState(false)
  if (!show){
    return <button className="underline hover:text-sky-500" onClick={()=>setShow(true)}>View File</button>
  }else{
    return <iframe className="w-full h-[720px]"src={src} frameborder="0">
      Your browser does not support iframes.
    </iframe>
  }
}

export default FileView