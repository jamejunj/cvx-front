import { useRef, useState, Fragment, useEffect } from "react"
import { useNavigate, useParams, useOutletContext } from "react-router-dom"
import { Dialog, Transition } from "@headlessui/react"
import iconDefault from "../../assets/images/icon-default.png"
import useAuthentication from "../../hooks/useAuthentication"

import useGrab from "../../hooks/useGrab"
import axios from "axios"

function Stage({stage, body, setBody}){
    const courseid = useParams().courseid
    const [groupName, setGroupName] = useState("")
    const [groupSlogan, setGroupSlogan] = useState("")
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [members, setMembers] = useState([])
    const { data, error, loading } = useGrab({
        url: '/api/courses/' + courseid + '/roster/',
    })
    const { user } = useAuthentication()
    const updateMembers = (e) => {
        const user = users.find(user=>user._id == e.target.value)
        if (e.target.checked){
            setMembers([...members, user])
        }
        else{
            setMembers(members.filter(member=>member._id != e.target.value))
        }
    }
    useEffect(()=>{
        if (data){
            setUsers(data.sort((a,b)=>(a.first + a.last).localeCompare((b.first + b.last))))
        }
        if (user){
            if (members.find(member=>member._id == user._id) == undefined){
                setMembers([user, ...members])
            }
        }
    }, [data, user])
    switch (stage) {
        case 0:
            return <><div className="mb-2">
                <label htmlFor="groupName" className="">Group Name</label>
                <input value={groupName} placeholder="Enter group name" onChange={(e)=>setGroupName(e.target.value)} type="text" className="rounded w-full border-2 border-slate-200 focus:border-sky-500 p-2" />
                </div>
                <div className="mb-2">
                <label htmlFor="groupName" className="">Group Slogan</label>
                <input value={groupSlogan} placeholder="Enter group slogan (optional)" onChange={(e)=>setGroupSlogan(e.target.value)} type="text" className="rounded w-full border-2 border-slate-200 focus:border-sky-500 p-2" />
                </div>
            </>
        case 1:
            return <SecondSteps 
            group={{name: groupName, description: groupSlogan}} 
            search={search} setSearch={setSearch} 
            users={users} error={error} loading={loading}
            members={members} updateMembers={updateMembers} setMembers={setMembers}
            ></SecondSteps>
        case 2:
            return <ThirdSteps 
            group={{name: groupName, description: groupSlogan, members: members}} 
            body={body} setBody={setBody}
            />
        default:
            return <></>
    }
}

function SecondSteps({group, search, setSearch, users, error, loading, members, updateMembers}){
    return <><div>
    <div className="p-2 mb-2 border-b">
        <h6 className="font-bold">{group.name}</h6>
        <div className="text-slate-500">{group.description}</div>
    </div>
    <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="w-full dark:w-full rounded px-4 py-2 border-2 border-slate-200 focus:border-sky-500" placeholder="Search for users" />
    <div className="max-h-64 overflow-y-auto">
        {loading && <div>Loading...</div>}
        {error && <div>Error</div>}
        <ul className="p-2 space-y-2">
            {users && users.filter(usr=>(usr.first + ' ' + usr.last).toLowerCase().indexOf(search.toLowerCase()) != -1).map((usr, index) => {
                return <li key={usr._id}>
                    <label className="p-2 rounded flex space-x-2 hover:bg-sky-200 cursor-pointer" for={usr._id}><div>
                    <input className="w-6 h-6 accent-sky-600" defaultChecked={members.find(member=>member._id == usr._id)!==undefined} onChange={updateMembers} type="checkbox" name="members" id={usr._id} value={usr._id}/>
                    </div>
                    <img src={usr.img || "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"} className="rounded w-8 h-8" alt="profile" />
                    <div>{usr.first} {usr.last}</div>
                    </label>
                </li>
            })}
        </ul>
    </div>
</div>
    </>
}

function ThirdSteps({group, body, setBody}){
    useEffect(()=>{
        setBody({
            name: group.name,
            description: group.description,
            members: group.members
        })
    }, [])
    return <>
        <div>
            <div>This is what your group will look like</div>
            <div className="p-2 mb-2 border-b">
                <GroupItem group={group}/>
            </div>
        </div>
    </>
}

function User({user}){
    return 
}

const title = [
    "Create new Group",
    "Add member to group",
    "Preview",
]

function GroupCreate() {
  const { current, update, setUpdate } = useOutletContext();
  const courseid = useParams().courseid
  const [isOpen, setIsOpen] = useState(true)
  const [body, setBody] = useState({})
  const navigate = useNavigate()
  const handleClick = (e) => {
    if (e.target === backdrop.current){
        navigate("..")
    }
  }
  const [stage, setStage] = useState(0);
  const onClose = () => {
    navigate("./..")
  }
  const back = () => {
    if (stage===0){
        navigate("..")
    }
    setStage(stage - 1)
  }
  const next = async () => {
    if (stage>=title.length-1){
        const res = await axios.post(import.meta.env.VITE_SERVER + `/api/courses/${courseid}/grouping/${current}`, body);
        setUpdate(update+1)
        navigate("..")
    }
    setStage(stage + 1)
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
                    Create new group 
                  </Dialog.Title>
                  <Stage stage={stage} body={body} setBody={setBody}/>
                  <div className="border-t border-slate-200 space-x-2 p-2 text-right">
                    <button onClick={back} className="bg-slate-200 hover:bg-slate-300 rounded px-4 py-2">{stage === 0 ? 'Close' : 'Back'}</button>
                    <button onClick={next} className="bg-slate-900 hover:bg-slate-800 text-white rounded px-4 py-2">{stage === title.length - 1 ? 'Create' : 'Next'}</button>
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

function GroupItem({group}){
    return <div className="flex flex-col divide-y divide-slate-200 dark:text-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800 rounded-lg shadow">
                <div className="p-4 flex space-x-2">
                    <div><img className="w-16 h-16" src={group.img ? group.img : iconDefault} alt="" /></div>
                    <div>
                        <h5 className="font-bold">{group.name}</h5>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{group.description}</p>
                    </div>
                </div>
                <div className="p-4">
                    <ul>
                        {group.members?.map((member, index) => {
                            return <li key={index}>{[member.first, member.last].join(' ')}</li>
                        })}
                    </ul>
                </div>
                <div className="p-4">
                    <div className="inline-flex gap-1 text-slate-500 dark:text-slate-400">
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        </div>
                        <div>{group.members?.length}</div>
                    </div>
                </div>
    </div>
}

export default GroupCreate