import { useEffect, useState, useRef } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

import iconDefault from '../../assets/images/icon-default.png'
import useGrab from '../../hooks/useGrab'

import axios from 'axios'
import useAuthentication from '../../hooks/useAuthentication'

// import GroupAdd from '@mui/icons-material/GroupAdd';


function Group() {
  const {courseid} = useParams()
  const [current, setCurrent] = useState("")
  const [update, setUpdate] = useState(0)
  const usr = useAuthentication()
  const [groups, setGroups] = useState([])
  const [yourGroup, setYourGroup] = useState([])
  const { data, error, loading } = useGrab({
    url: '/api/courses/' + courseid + '/grouping/',
  }, null, [])
  useEffect(()=>{
    if (groups && usr.user && groups.length > 0){
        const result = groups.filter(group => {
            for (const member of group.members){
                if (member._id === usr.user._id){
                    return true
                }
            }
            return false
        })
        setYourGroup(result)
        console.log(result)
    }
  }, [groups])
  useEffect(() => {
    if (data && data.length > 0) {
        setCurrent(data[0]._id)
        if (!current){
            setGroups(data[0].groups)
        }else{
            const result = data.filter(grouping => grouping._id === current)
            setGroups(result[0].groups)
        }
    }else{
        setGroups([])
    }
}, [data])
  useEffect(()=>{
    const fetch = async () => {
        const result = await axios.get(import.meta.env.VITE_SERVER + '/api/courses/' + courseid + '/grouping/' + current)
        setGroups(result.data.data.groups)
    }
    fetch();
  }, [update, current])
  if (loading){
    return <div>Loading...</div>
  }
    if (error){
    console.log(error)
    return <div>Error</div>
    }
  const handleChange = async (e) => {
    setCurrent(e.target.value)
    setGroups(result.data.data.groups)
  }
  return (
    
    <div className="container mx-auto p-4">
        <h2 className="font-bold text-3xl my-4">Group</h2>
        <div className="flex justify-between mb-6">
        <select onChange={handleChange} className="px-4 py-2 border-2 rounded outline-none border-slate-200 focus:border-sky-500 active:border-sky-500 dark:border-0 dark:bg-slate-800 dark:focus:bg-slate-700">
            {data && data?.map((grouping, index) => {
                return <option key={grouping._id} value={grouping._id}>{grouping.grouping_name}</option>
            })}
        </select>
        <Link to="new">
            <button className="flex space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:text-slate-900 dark:bg-slate-200 dark:hover:bg-slate-300 rounded">
            <span class="material-symbols-rounded">
            group_add
            </span>
                <span className="max-sm:hidden">Create a new group</span>
            </button>
        </Link>
        </div>
        {yourGroup && yourGroup.length > 0 && <div className="pb-2 mb-2 border-b dark:border-slate-800">
            <h3 className="font-medium mb-2">Your Group</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {yourGroup?.map((group, index) => {
                return <GroupItem key={index} group={group}/>
            })}
            </div>
        </div>}
        <h3 className="font-medium mb-2">Groups</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {groups?.map((group, index) => {
                return <GroupItem key={index} group={group} editable={true}/>
            })}
            {groups?.length === 0 && <div className="md:col-span-3 flex flex-col">
            <div className="text-center text-slate-500 dark:text-slate-400 text-xl">No group</div>
            <div className="text-center text-slate-500 dark:text-slate-400">There is no group in this grouping</div>
        </div>}
        </div>
        <Outlet context={{current, update, setUpdate}}/>
    </div>
  )
}

function GroupItem({group, editable}){
    return <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 rounded-lg shadow">
                <div className="p-4 flex space-x-2">
                    <div className="shrink-0"><img className="w-16 h-16" src={group.img ? group.img : iconDefault} alt="" srcset="" /></div>
                    <div className="w-full">
                        <h5 className="font-bold">{group.name}
                        {editable ?? <Link to={"./" + group._id + "/edit"} className="float-right p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        </Link>}
                        </h5>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{group.description}</p>
                    </div>
                </div>
                <div className="p-4 flex-1">
                    <ul>
                        {group.members?.sort((a,b)=>(a.first + a.last).localeCompare((b.first + b.last))).map((member, index) => {
                            return <li key={index}>{[member.first, member.last].join(' ')}</li>
                        })}
                    </ul>
                </div>
                <div className="px-4 py-2">
                    <div className="inline-flex gap-1 text-slate-500 dark:text-slate-400">
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        </div>
                        <div>{group.members.length}</div>
                    </div>
                </div>
    </div>
}

export default Group