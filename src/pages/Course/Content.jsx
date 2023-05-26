import { useEffect, useRef, useState } from "react"

import File from "../../components/File/File"
import ExternalLink from "../../components/ExternalLink/ExternalLink"

import useGrab from "../../hooks/useGrab"
import { useParams } from "react-router-dom"

function Community(){
    const { data, loading } = useGrab({
        url: "/api/courses/" + useParams().courseid,
        method: "GET",   
    })
    if(loading) return <div>Loading...</div>
    if(!data) return <div>Failed to load</div>
    console.log(data)
    return <ul className="flex flex-col space-y-2">
        {null && data.course_contact?.facebook && <a href={data.course_contact?.facebook} target="_blank" rel="noopener noreferer"><li className="flex space-x-2 rounded-2xl bg-white hover:border-sky-500 p-2 border-2 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-400">
            <img className="block w-12 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" alt="facebook icons"/>
            <div className="font-bold">
                Facebook Group
            </div>
        </li></a>}
        {null && data.course_contact?.team && <a href={data.course_contact?.team} target="_blank" rel="noopener noreferer"><li className="flex space-x-2 rounded-2xl bg-white hover:border-sky-500 p-2 border-2 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-400">
            <img className="block w-12 h-auto" src="https://www.mycourseville.com/sites/all/modules/courseville/pict/icon_featuremsteams.png" alt="ms-team icons"/>
            <div className="font-bold">
                Team
            </div>
        </li></a>}
        {data.course_contact?.echo && <a href={data.course_contact?.echo} target="_blank" rel="noopener noreferer"><li className="flex space-x-2 rounded-2xl bg-white hover:border-sky-500 p-2 border-2 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-400">
            <img className="block w-12 h-auto" src="https://www.mycourseville.com/sites/all/modules/courseville/inc_lti/echo360_button_logo.png" alt="ms-team icons"/>
            <div className="font-bold">
                Launch echo360
            </div>
        </li></a>}
    </ul>
}

function ContentList(){
    const { data, loading } = useGrab({
        url: "/api/courses/" + useParams().courseid + "/contents",
        method: "GET",   
    })
    const [contents, setContents] = useState([])
    useEffect(()=>{
        if(data){
            setContents(data.sort((a, b) => {
                return (new Date(b.file_upload_datetime) - new Date(a.file_upload_datetime))
            }))
        }
    })
    const [last, setLast] = useState(5)
    const seeMore = () => {
        setLast(last + 5)
    }
    const [search, setSearch] = useState("")
    const handleSearch = (e) => {
        setLast(data.length)
        setSearch(e.target.value)
    }
    return <>
    <h2 className="text-3xl font-bold my-4">Content</h2>
            <div className="my-2 flex -space-x-1 group border-2 border-slate-200 dark:border-transparent bg-white dark:bg-slate-800 focus-within:border-sky-500 dark:focus-within:bg-slate-700 rounded"> 
                <input onChange={handleSearch} type="text" className="bg-transparent w-full px-4 py-2 peer" placeholder="Search content ..." />
                <div className="flex text-slate-500 peer-focus:text-sky-500 dark:peer-focus:text-slate-50 justify-center items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                </div>
            </div>
            <div className="flex flex-col p-2 gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent  rounded-2xl">
                {loading && <div>Loading...</div>}
                {!loading && contents && contents.slice(0, last).filter((content) => {
                    return content.file_name.toLowerCase().includes(search.toLowerCase())
                }).map((content, index) => {
                            return <File key={content._id} content={content}/>
                        })}
                {last < contents.length && <button onClick={seeMore} className="w-full text-sky-500 bg-slate-50 rounded hover:bg-slate-200 p-1 dark:bg-transparent dark:hover:bg-slate-700 dark:text-sky-400">See More</button>}
                {!loading && contents && contents.slice(0, last).filter((content) => {
                    return content.file_name.toLowerCase().includes(search.toLowerCase())
                }).length === 0 && <div className="text-slate-500 dark:text-slate-400 text-center my-2">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>
                </div>
                <h5 className="text-xl">Sorry!</h5>
                <p className="text-sm">We could not find any contents matching "{search}"</p>
                </div>}
                {contents && contents.length === 0 && <div className="text-slate-500 dark:text-slate-400 text-center my-2">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>
                </div>
                <h5 className="text-xl">Stay tuned!</h5>
                <p className="text-sm">This course currently not provide any materials yet</p>
                </div>}
            </div>
    </>
}

function ExternalLinkLists(){
    const { data, loading } = useGrab({
        url: "/api/courses/" + useParams().courseid + "/links",
        method: "GET",   
    })
    return <>
    <h2 className="text-2xl font-bold my-4">External Links</h2>
            <div className="flex flex-col p-2 gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent  rounded-2xl">
                {loading && <div>Loading...</div>}
                {!loading && data.length === 0 && <div className="text-slate-500 dark:text-slate-400 text-center my-2">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>
                </div>
                <h5 className="text-xl">Stay tuned!</h5>
                <p className="text-sm">This course currently not provide any external link yet</p>
                </div>}
                {!loading && data && data.map((link, index) => {
                    return <ExternalLink key={link._id} link={link}/>
                })}
            </div>  
    </>
}

function Content() {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/** 1st column */}
        <div className="col-span-1 order-2 md:order-1">
            <Community/>

            <PlayList/>            
        </div>
        {/** 2nd column */}
        <div className="col-span-1 md:col-span-2 order-1 md:order-2">

            <ContentList/>

            <ExternalLinkLists/>
        </div>
    </div>
  )
}

function PlayList(){
    const { data, loading, error } = useGrab({
        url: "/api/courses/" + useParams().courseid + "/playlists",
        method: "GET",
    })
    return <>
    <h2 className="text-2xl font-bold my-4">Playlist</h2>
            <div className="space-y-2">
                {loading && <div>Loading...</div>}
                {!loading && data && data.map((playlist, index) => {
                    return <PlayListItem key={playlist._id} playlist={playlist}/>
                })}
                {data && data.length === 0 && <div className="text-slate-500 dark:text-slate-400 text-center my-2">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>
                </div>
                <h5 className="text-xl">Stay tuned!</h5>
                <p className="text-sm">This course currently not provide any playlist yet</p>
                </div>}
            </div>
    </>
}

function PlayListItem({playlist}){
    return <div className="flex space-x-2 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700  rounded-2xl overflow-hidden">
                    <div className="relative w-48 h-32 overflow-hidden">
                        <img className="absolute min-h-[8rem] object-cover left-1/2 -translate-x-1/2" src={playlist.playlist_thumbnails.url} alt="" />
                        <a href={"https://youtube.com/playlist?list=" + playlist.playlist_id} target="_blank"><h5 className="cursor-pointer hover:underline font-bold text-lg"></h5><button className="cursor-pointer absolute inline-flex items-center justify-center top-1/2 left-1/2 -translate-x-6 -translate-y-6 w-12 h-12 rounded-full bg-sky-500 text-white border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                        </button></a>
                        {/* <div className="absolute bottom-0 w-full h-1 flex bg-slate-200 bg-opacity-50">
                            <div className="h-full bg-sky-500" style={{width: "37%"}}></div>
                        </div> */}
                    </div>
                    <div className="p-2">
                        <a href={"https://www.youtube.com/playlist?list=" + playlist.playlist_id} target="_blank"><h5 className="cursor-pointer hover:underline font-bold text-lg">{playlist.playlist_title}</h5></a>
                        <p className="text-slate-500 text-sm">{playlist.playlist_channel}</p>
                    </div>
    </div>
}

function PlaylistViewer({youtube_vid, title, display, setDisplay}){
    const backdropRef = useRef(null);
    const handleBackdropClick = (e) => {
        if (backdropRef.current === e.target) {
            setDisplay(false)
        }
    }
    return (
        <div ref={backdropRef} onClick={handleBackdropClick} className={`fixed z-10 h-full w-full top-0 left-0 bg-black bg-opacity-25 ${display ? null : 'hidden'}`}>
            <div className="flex flex-col justify-between container w-full h-screen max-w-[720px] mx-auto bg-white">
                <div className="p-4 border-b border-slate-200 flex justify-between">
                    <div>
                    <h5 className="font-bold">คุณอยากสั่งซื้อ Tesla</h5>
                    <p className="text-slate-500 text-sm">9arm</p>
                    </div>
                    <div>
                        <span className="rounded-[2rem] px-4 py-2 bg-slate-400 text-white">0%</span>
                    </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                    <div className="flex space-x-2 bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="relative w-48 h-32 overflow-hidden">
                            <img className="absolute min-h-[8rem] object-cover left-1/2 -translate-x-1/2" src="https://i.ytimg.com/vi/5P5nps6mBLo/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAWeJOj3g1vKv4NKVHXxmLX2hE3mw" alt="" />
                            <div className="absolute bottom-0 w-full h-1 flex bg-slate-200 bg-opacity-50">
                                <div className="h-full bg-sky-500" style={{width: "37%"}}></div>
                            </div>
                        </div>
                        <div className="p-2">
                            <a href><h5 className="cursor-pointer hover:underline font-bold text-lg">คุณอยากสั่งซื้อ Tesla</h5></a>
                            <p className="text-slate-500 text-sm">Progress: 37%</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="relative w-32 h-16 overflow-hidden">
                            <img className="absolute min-h-[4rem] object-cover left-1/2 -translate-x-1/2" src="https://i.ytimg.com/vi/5P5nps6mBLo/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAWeJOj3g1vKv4NKVHXxmLX2hE3mw" alt="" />
                            <div className="absolute bottom-0 w-full h-1 flex bg-slate-200 bg-opacity-50">
                                <div className="h-full bg-sky-500" style={{width: "95%"}}></div>
                            </div>
                        </div>
                        <div className="p-2">
                            <a href><h5 className="cursor-pointer hover:underline font-bold text-lg">คุณอยากสั่งซื้อ Tesla</h5></a>
                            <p className="text-slate-500 text-sm">Progress: 95%</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <div className="relative w-32 h-16 overflow-hidden">
                            <img className="absolute min-h-[4rem] object-cover left-1/2 -translate-x-1/2" src="https://i.ytimg.com/vi/5P5nps6mBLo/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAWeJOj3g1vKv4NKVHXxmLX2hE3mw" alt="" />
                            <div className="absolute bottom-0 w-full h-1 flex bg-slate-200 bg-opacity-50">
                                <div className="h-full bg-sky-500" style={{width: "47%"}}></div>
                            </div>
                        </div>
                        <div className="p-2">
                            <a href><h5 className="cursor-pointer hover:underline font-bold text-lg">คุณอยากสั่งซื้อ Tesla</h5></a>
                            <p className="text-slate-500 text-sm">Progress: 47%</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="p-4 border-t border-slate-200">
                    <button onClick={()=>setDisplay(false)}className="px-4 py-2 bg-slate-500 hover:bg-slate-700 text-white rounded">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Content