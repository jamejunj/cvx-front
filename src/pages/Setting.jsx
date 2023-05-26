import { useState, useRef, useEffect } from 'react'

function Setting(){
    return <div className="p-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Setting</h1>
        To change your account informations. Please go to original <a target="_blank" className="text-sky-500 hover:underline" href="https://mycourseville.com/?q=courseville/course/account">myCourseVille</a>
        <div className="my-6">
            <div className="flex space-x-2 items-center">
            <DarkModeSwitch/>
            <div>Darkmode</div>
            </div>
        </div>
    </div>
}

function DarkModeSwitch(){
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")
    const toggleTheme = () => {
      if (theme === "light") {
        setTheme("dark")
        localStorage.setItem('theme', 'dark')
      } else {
        setTheme("light")
        localStorage.setItem('theme', 'light')
      }
    }
    useEffect(()=>{
      if (theme === "light") {
        document.documentElement.classList.remove("dark")
      } else {
        document.documentElement.classList.add("dark")
      }
    }, [theme])
    return  <button type="button" onClick={toggleTheme}><div className="relative rounded-full cursor-pointer bg-slate-200 hover:bg-slate-400 dark:text-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 w-10 h-10 p-2">
    { (theme == 'light') &&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg> }
    { (theme == 'dark') && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
   }
    </div></button>
  }

function NotSetting() {
  return (
    <div className="container mx-auto p-4">
        
        <h2 className="text-2xl font-bold mb-4">Account</h2>
        <dl className="bg-white rounded border-slate-200 text-sm">
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="font-medium text-gray-500">Title</dt>
                <dd class="mt-1 sm:col-span-2 sm:mt-0">
                    <EditData field="title" current={"Mr."}/>
                </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="font-medium text-gray-500">First Name</dt>
                <dd class="mt-1 sm:col-span-2 sm:mt-0">
                    <EditData field="firstname" current={"Jirakit"}/>
                </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="font-medium text-gray-500">Last Name</dt>
                <dd class="mt-1 sm:col-span-2 sm:mt-0">
                    <EditData field="lastname" current={"Jirapongwanich"}/>
                </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="font-medium text-gray-500">Custom Alias</dt>
                <dd class="mt-1 sm:col-span-2 sm:mt-0">
                    <EditData field="alias" current={"Jame"}/>
                </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="font-medium text-gray-500">Login With</dt>
                <dd class="mt-1 sm:col-span-2 sm:mt-0">
                    myCourseVille Account
                </dd>
                </div>
        </dl>
    </div>
  )
}

function EditData({
    field,
    current
}){
    const inputRef = useRef()
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState(current)
    const [value, setValue] = useState(current)
    const toggleEdit = () => {
        if (edit){
            setEdit(!edit)
            setValue(data)
        }else{
            setEdit(!edit)
            inputRef.current.focus()
        }
    }
    const saveEdit = (e) => {
        e.preventDefault()
        setEdit(!edit)
        setData(value)
        // query update to api
        console.log(field, inputRef.current.value)
    }
    const change = (e) => {
        setValue(e.target.value)
    }
    return (
        <div className="flex justify-between">
            <div className="flex-1">
                {edit ? <input ref={inputRef} onChange={change} type="text" className="border block w-full border-gray-300 rounded p-2" defaultValue={data} /> : data}
            </div>
            <div className="p-2">
                {value!==data && <button className="text-sky-500 hover:underline hover:text-sky-700 rounded" onClick={saveEdit}>
                    Save
                </button>}
                {edit ? <button className="text-red-500 hover:underline hover:text-red-700 rounded" onClick={toggleEdit}>
                    Cancel
                </button> : <button className="text-sky-500 hover:underline hover:text-sky-700 rounded" onClick={toggleEdit}>
                    Edit
                </button>}
                
            </div>
        </div>
    )
}

export default Setting