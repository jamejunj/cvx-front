import axios from 'axios';
import { Fragment,useState, useRef, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import useGrab from '../../hooks/useGrab';

import moment from 'moment';

import { ConfirmDialog, AcknowledgeDialog } from '../../components/Dialog/Dialog';

function AssignmentWorksheet() {
  const { courseid, asgn_id } = useParams();
  const formRef = useRef(null)
  const [progress, setProgress] = useState([])
  const [files, setFiles] = useState({})
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [acknowledgeDialog, setAcknowledgeDialog] = useState(false)
  const { data, loading, error } = useGrab({
    url: '/api/courses/:course_id/assignments/:asgn_id/my'.replace(':course_id', courseid).replace(':asgn_id', asgn_id),
  }, localStorage.getItem('token'), [acknowledgeDialog])
  const [asgn, setAsgn] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [answer, setAnswer] = useState(null)
  useEffect(() => {
    if (!loading && !error && data) {
      setAsgn(data)
      setDisabled(!(!data.my || data.assignment_attempt === 0))
      let total = (data.assignment_text ? 1 : 0) + (data.assignment_file ? data.assignment_file.length : 0) + (data.assignment_questionset ? data.assignment_questionset.length : 0);
      if (data.my){
        setProgress(new Array(total).fill(1))
      }else{
        setProgress(new Array(total).fill(0))
      }
      console.log(data)
    }
  }, [data])
  const attachFile = (key, file) => {
    setFiles((prev) => {
      const obj = {
        ...prev
      }
      obj[key] = file
      return obj
    })
  }
  const trackProgress = (e) => {
    const form_data = new FormData(formRef.current)
    const data = Object.fromEntries(form_data)
    let textbox = []
    let items = []
    let files = []
    for (const key of Object.keys(data)){
      if (data[key]!=='' && data[key]!==null){
        if (key.startsWith('textbox')){
          textbox.push(1)
        } else if (key.startsWith('item')){
          items.push(1)
        } else if (key.startsWith('file')){
          files.push(1)
        }
      }else{
        if (key.startsWith('textbox')){
          textbox.push(0)
        } else if (key.startsWith('item')){
          items.push(0)
        } else if (key.startsWith('file')){
          files.push(0)
        }
      }
    }
    setProgress(textbox.concat(items, files))
  }
  const performSubmit = async () => {
    setConfirmDialog(false)
    const response = await axios.post(import.meta.env.VITE_SERVER + '/api/courses/:courseid/assignments/:asgn_id/submit'.replace(':courseid', courseid).replace(':asgn_id', asgn_id), answer,
    {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    if (response.status){
      setTimeout(()=>{
        setAcknowledgeDialog(true)
      }, 200)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form_data = new FormData(e.target)
    const data = Object.fromEntries(form_data)
    setAnswer(data)
    setConfirmDialog(true)
  }
  if (loading){
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center">
          <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <div>Loading...</div>
        </div>
      </div>
    )
  }
  if (error){
    return <div className="">Error</div>
  }

    return (
      asgn && <form ref={formRef} onSubmit={handleSubmit}>
        <div className="container mx-auto p-4">
            <Link to="./../.." className="inline-flex p-2 space-x-2 text-slate-800 dark:text-slate-200 hover:underline focus:bg-gray    -200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                <div>Back</div>
            </Link>
            <h2 className="text-3xl font-bold my-4">{asgn.assignment_name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="main col-span-2 order-2 md:order-1">
            { !asgn.my && <div className="font-bold">Possible Score: <span className="font-normal">{asgn.assignment_score}</span></div>}
            <div className="font-bold">Instruction</div>
            <p>{(asgn.assignment_description ? asgn.assignment_description : <i className="text-sm">No instruction provided</i>)}</p>
            {asgn.assignment_text && <div className="worksheet mt-8 flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                <div className="p-4 flex justify-between border-b border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold ">Text Response</h5>
                    {asgn.assignment_score_essay > 0 && <div className="float-right text-sm px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-700">
                      {asgn.assignment_score_essay} Point
                    </div>}
                </div>
                <div className="textanswer">
                    <textarea disabled={disabled} onChange={trackProgress} name="textbox" className="bg-inherit h-32 w-full outline-none placeholder:italic p-4" placeholder="Write your answer here ..." defaultValue={asgn.my?.response['textbox']}></textarea>
                </div>
            </div>}
            {
              asgn.assignment_questionset?.length > 0 && <div className="worksheet mt-8 flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg">
              <div className="p-4 flex justify-between border-b border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold ">Question Sets</h5>
                    {asgn.assignment_score_questionset > 0 && <div className="float-right text-sm px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-700">
                      {asgn.assignment_score_questionset} Point
                    </div>}
              </div>
              {
                asgn.assignment_questionset.map((question, index) => {
                  return <div key={index} className="quiz p-4">
                    {question.score && <div className="float-right border dark:border-slate-700 px-2 py-1 text-sm">{asgn.my?.feedback.show ? ( question.options && question.options[asgn.my?.response['item-' + question._id]].correct ? `${question.score}/${question.score} point` : `0/${question.score} point`) : `${question.score} point` } </div>}
                    <p className="font-medium mb-2">{index + 1}. {question.question}</p>
                    {question.type==='options' && question.options && <Options disabled={disabled} item={question._id} onChange={trackProgress} choices={question.options} defaultValue={asgn.my?.response['item-' + question._id]}/>}
                    {(question.type!=='options' || !question.options) && <OpenEnded disabled={disabled} item={question._id} onChange={trackProgress} defaultValue={asgn.my?.response['item-' + question._id]}/>}
                </div>
                })
              }
            </div>
            }

            {
            asgn.assignment_file?.length > 0 && <div className="worksheet mt-8 flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg">
            <div className="p-4 flex justify-between border-b border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold ">File Upload</h5>
                    {asgn.assignment_score_file > 0 && <div className="float-right text-sm px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-700">
                      {asgn.assignment_score_file} Point
                    </div>}
            </div>
            <div className="attachment p-4">
                {asgn.assignment_file.map((file, index) => {
                  return <div key={index}>
                  <p className="font-medium mb-2">{file.slotname}</p>
                  <div className="file px-4 py-2">
                  {
                    asgn.my?.response['file-' + file._id] &&
                    <div className="attached my-2">
                      <p className="text-sm">Your current attachment:</p>
                      <Attachment file={{
                        filename: asgn.my?.response['file-' + file._id].split('/').pop(),
                        location: asgn.my?.response['file-' + file._id]
                      }}/>
                    </div>
                  }
                  {!disabled && <FileUpload item={file._id} onChange={trackProgress} attachFile={attachFile}/>}
                  </div>
                  </div>
                })}
            </div>
            </div>
            }

        </div>


            <div className="side order-1 md:order-2">
              <div className="md:sticky md:top-16">
                <div className="rounded-2xl bg-white dark:bg-slate-800 dark:text-slate-200 p-4 shadow-md flex flex-col gap-2">
                <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Due Date</div>
                <div>{asgn.assignment_due ? moment(asgn.assignment_due).format('DD MMM YYYY, HH:mm') : 'No due date'}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Attempt</div>
                <div>{asgn.assignment_attempt > 0 ? '1 attempt left' : 'Unlimited'}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Group</div>
                <div>{asgn.assignment_group ? asgn.assignment_group : 'Individual'}</div>
              </div>
            </div>
            {asgn.my && <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Score</div>
                <div>
                  <div className="min-w-[6rem]">{asgn.my?.feedback.score ? <Score score={asgn.my.feedback.score} max={asgn.assignment_score} show={asgn.my.feedback.show}/> : <Score score={null} max={asgn.assignment_score}/>}</div>
                </div>
              </div>
            </div>}
            {(!asgn.my || asgn.assignment_attempt === 0) && <div className="flex space-x-2">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
              </svg>
              </div>
              <div className="flex flex-col w-full">
                <div className="font-bold">Progress</div>
                <div className="w-full"><Progress progress={progress}/></div>
              </div>
            </div>}
            <div className="hidden flex-col space-y-2 md:flex border-t pt-2">
              {/* <p className="italic text-sm">Last saved on ...</p> */}
              {/* <button className="bg-slate-200 hover:bg-slate-300 rounded px-4 py-2">Preview</button> */}
              {(!asgn.my || asgn.assignment_attempt === 0) && <button disabled={progress.some((i)=>i!=1)} className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-200 dark:hover:bg-slate-300 text-white dark:text-slate-800 rounded px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-800 dark:disabled:bg-slate-300">{asgn.my ? 'Submit again' : 'Submit'}</button>}
              {asgn.my && <p>Last submitted on {moment(asgn.my?.datetime).format('YYYY, MMM DD. HH:mm:ss')}</p>}
            </div>
            </div>
            {asgn.my && asgn.my?.feedback.show && <div className="worksheet mt-4 flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg">
              <div className="p-2 flex items-center space-x-2 border-b border-slate-200 dark:border-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
                  <h5 className="font-bold ">Instructor Feedback</h5>
              </div>
              <div className="textanswer p-4">
                <p>{asgn.my?.feedback.comment}</p>
              </div>
            </div>}
            </div>
            
            </div>
            </div>

            <div className="flex flex-col mt-2 space-y-2 md:hidden">
            {(!asgn.my || asgn.assignment_attempt === 0) && <button disabled={progress.some((i)=>i!=1)} className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-200 dark:hover:bg-slate-300 text-white dark:text-slate-800 rounded px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-800 dark:disabled:bg-slate-300">{asgn.my ? 'Submit again' : 'Submit'}</button>}
              {asgn.my && <p className="dark:text-white">Last submitted on {moment(asgn.my?.datetime).format('YYYY, MMM DD. HH:mm:ss')}</p>}
            </div>
        </div>
        <ConfirmDialog
          open={confirmDialog}
          onConfirm={performSubmit}
          onClose={()=>{setConfirmDialog(false)}}
          title="Submit Assignment"
        >
          Are you sure you want to submit this assignment?
        </ConfirmDialog>
        <AcknowledgeDialog
          title={"Submitted"}
          open={acknowledgeDialog}
          onClose={()=>{
            setAcknowledgeDialog(false)
          }}
        >
          <div className="flex flex-col items-center space-y-2">
          <p>Assignment Submitted</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Your assignment have been submitted successfully</p>
          </div>
        </AcknowledgeDialog>
        </form>
    )
}



function Progress({progress}){
  let perc = progress.reduce((a,b)=>a+b, 0) / progress.length * 100
  // return (
  //   <div className="h-2 my-2 flex w-full rounded-full bg-slate-200 overflow-hidden">
  //     { perc < 100 ? 
  //     <div style={{width: perc + '%'}} className="bg-sky-500 duration-300 transition-[width]" /> 
  //     :
  //     <div style={{width: perc + '%'}} className="bg-green-500 duration-300 transition-[width]" />
  //     }
  //   </div>
  // )
  return <div className="flex items-center py-2 space-x-1">
    {progress.map((p, i)=>{
      if (p){
        return <div className="w-4 h-4 rounded-full bg-sky-500 transition-colors"></div>
      }else{
        return <div className="w-4 h-4 rounded-full bg-slate-400 transition-colors"></div>
      }
    })}
    <div className="text-sm">({perc.toFixed(2)} %)</div>
  </div>
}

function Comment({asgn}){
  return (asgn.my && asgn.my?.feedback.show) && <div className="worksheet mt-8 flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg">
  <div className="p-4 flex justify-between border-b border-slate-200 dark:border-slate-700">
      <h5 className="font-bold ">Instructor Feedback</h5>
  </div>
  <div className="textanswer p-4">
    <p>Score: {asgn.my?.feedback.score ? asgn.my?.feedback.score : '-'}/{asgn.assignment_score}</p>
    <p>{asgn.my?.feedback.comment}</p>
  </div>
</div>
}

function Attachment({file, uploading, onDetach}){
  if (uploading){
    <div className="opacity-50 cursor-not-allowed inline-flex items-center px-2 py-1 rounded-full border group space-x-2 hover:bg-slate-100 dark:hover:bg-slate-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
    </svg>
    <span>Uploading {Math.round(uploading)}%...</span>
  </div>
  }
  return <div className="inline-flex items-center px-2 py-1 rounded-full border group space-x-2 hover:bg-slate-100 dark:hover:bg-slate-700">
    <a href={file.location} className="inline-flex" target='_blank' rel="noopenner noreferer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
      </svg>
      <span>{file.filename}</span>
    </a>
    {onDetach && <span onClick={onDetach} className="cursor-pointer text-slate-500 dark:text-slate-200 opacity-50 hover:opacity-95">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
  </span>}
  </div>
}

function FileUpload({
  item,
  accept,
  onChange,
  attachFile,
}){
  const inputRef = useRef(null)
  const dropZone = useRef(null)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const auth = useContext(AuthContext)
  const handleDragOver = (e) => {
    e.preventDefault();
    dropZone.current.classList.add('bg-slate-200')
    dropZone.current.classList.add('dark:bg-slate-700')
  }
  const handleDragLeave = (e) => {
    e.preventDefault();
    dropZone.current.classList.remove('bg-slate-200')
    dropZone.current.classList.remove('dark:bg-slate-700')
  }
  const handleDrop = async (e) => {
    e.preventDefault();
    dropZone.current.classList.remove('bg-slate-200')
    dropZone.current.classList.remove('dark:bg-slate-700')
    if (e.dataTransfer.items) {
      if (e.dataTransfer.items.length > 1) {
          alert('You can only upload one file at a time!')
      }
      if (e.dataTransfer.items[0].kind==='file'){           
          const file = e.dataTransfer.files[0]
          if (file.size > 20000000) {
            alert("File is too large. Max size is 20MB.")
            return
          }
          setUploading(0.01)
          const uploadRequest = await axios.post(import.meta.env.VITE_SERVER + '/api/upload', {
            attachment: file
          }, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': auth.token,
            },
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent
              let percent = Math.floor((loaded * 100) / total)
              if (percent < 100) {
                setUploading(percent)
              }
            }
          })
          if (!uploadRequest.data) {
            return;
          }
          const { data } = uploadRequest
          inputRef.current.value = data.data.location
          onChange()
          setFile(data.data)
          attachFile(item, file)
          }
    }
    e.stopPropagation();
  }
  const handleClickUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file.size > 20000000) {
        alert("File is too large. Max size is 20MB.")
        return
      }
      setUploading(0.01)
      const uploadRequest = await axios.post(import.meta.env.VITE_SERVER + '/api/upload', {
        attachment: file
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': auth.token,
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          let percent = Math.floor((loaded * 100) / total)
          if (percent < 100) {
            setUploading(percent)
          }
        }
      })
      if (!uploadRequest.data) {
        return;
      }
      const { data } = uploadRequest
      inputRef.current.value = data.data.location
      onChange()
      setFile(data.data)
      attachFile(item, file)
    }
    input.click()
  }

  const handleDetach = () => {
    const removeRequest = axios.delete(import.meta.env.VITE_SERVER + '/api/upload', {
      headers: {
        authorization: auth.token
      },
      data: {
        location: file.filename
      },
    })
    
    setFile(null)
    attachFile(item, null)
    inputRef.current.value = ""
    onChange()
  }
  return <>
  {file && <Attachment file={file} uploading={uploading} onDetach={handleDetach}/>}
  {!file && <div ref={dropZone} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className="border-2 border-dashed h-32 flex flex-col space-y-2 justify-center items-center">
    <p>Click to upload or drag file here (Max 20MB)</p>
    <button type="button" onClick={handleClickUpload} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-full text-white">Upload File</button>
  </div>}
  <input ref={inputRef} name={`file-${item}`} type="hidden"/>
  </>
}

function OpenEnded({
  item,
  onChange,
  defaultValue,
  disabled
}){
  return <textarea disabled={disabled} defaultValue={defaultValue} name={`item-${item}`} onChange={onChange} placeholder={"Write your answer ..."} className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded focus:outline-none bg-inherit focus:ring-offset-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent">
    </textarea>
}

function Options({
    item,
    choices,
    onChange,
    defaultValue,
    disabled
}){
    const inputRef = useRef()
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const [selected, setSelected] = useState(defaultValue ? parseInt(defaultValue) : "")
    function toggleCheck(index){
        if (disabled) return;
        if(selected===index){
            setSelected("")
            inputRef.current.value = ""
        }else{
            setSelected(index)
            inputRef.current.value = index
        }
        onChange()
    }
    return (
        <ul aria-disabled={disabled} className="aria-disabled:cursor-not-allowed">
            <input ref={inputRef} name={"item-" + item} type="hidden" defaultValue={selected}/>
            {choices.map((choice, index) => {
                return (<li key={index} onClick={()=>toggleCheck(index)} aria-disabled={disabled} aria-checked={selected===index} className="group cursor-pointer flex items-center space-x-2 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 aria-checked:bg-slate-900 dark:aria-checked:bg-slate-600 aria-checked:text-slate-50 aria-checked:font-bold aria-disabled:pointer-events-none">
                {/* <input checked={selected===index} className="w-6 h-6 accent-slate-900" type="radio" id={`item-${item}-choice-${index}`} value={index} /> */}
                <div className="inline-flex shrink-0 items-center justify-center w-6 h-6 rounded-full border border-black bg-white group-aria-checked:bg-black ring-2 ring-white">
                    <div className="text-black font-bold group-aria-checked:text-white ">{alphabet[index]}</div>
                </div>
                <label className="cursor-pointer" htmlFor={`item-${item}-choice-${index}`}>
                {choice.text}
                </label>
            </li>)
            })}
        </ul>
    )
}

function Score({score, max, show, grade}){
  const baseStyle = "font-medium px-4 py-2 text-center rounded-[2rem] shadow"
  if (!show){
    return <div className={baseStyle + " bg-gray-400 dark:bg-gray-600"}>
      - {max ? "/" +max : ""}
    </div>;
  }
  if (typeof grade === 'string'){
    switch (grade[0]){
      case 'A':
        return <div className={baseStyle + " bg-green-500"}>
          {grade}
        </div>;
      case 'B':
        return <div className={baseStyle + " bg-lime-400"}>
          {grade}
        </div>;
      case 'C':
        return <div className={baseStyle + " bg-yellow-400"}>
          {grade}
        </div>;
      case 'D':
        return <div className={baseStyle + " bg-orange-500"}>
          {grade}
        </div>;
      case 'F':
        return <div className={baseStyle + " bg-red-500"}>
          {grade}
        </div>;
      default:
        return <div className={baseStyle + " bg-gray-400 dark:bg-gray-600"}>
          -
        </div>;
    }
  }else if (typeof grade === 'number') {
    let perc = grade/4;
    if (perc < 0.5){
      return <div className={baseStyle + " bg-red-500"}>
        {grade}
      </div>;
    }
    if (perc < 0.75){
      return <div className={baseStyle + " bg-orange-500"}>
        {grade}
      </div>;
    }
    if (perc < 0.8){
      return <div className={baseStyle + " bg-yellow-400"}>
        {grade}
      </div>;
    }
    if (perc < 0.9){
      return <div className={baseStyle + " bg-lime-400"}>
        {grade}
      </div>;
    }
    return <div className={baseStyle + " bg-green-500"}>
        {grade}
      </div>;
  }
  let perc = score/max;
  if (perc < 0.5){
    return <div className={baseStyle + " bg-red-500"}>
      {score}/{max}
    </div>;
  }
  if (perc < 0.6){
    return <div className={baseStyle + " bg-orange-500"}>
      {score}/{max}
    </div>;
  }
  if (perc < 0.7){
    return <div className={baseStyle + " bg-yellow-400"}>
      {score}/{max}
    </div>;
  }
  if (perc < 0.8){
    return <div className={baseStyle + " bg-lime-400"}>
      {score}/{max}
    </div>;
  }
  return <div className={baseStyle + " bg-green-500"}>
      {score}/{max}
    </div>;
}

export default AssignmentWorksheet