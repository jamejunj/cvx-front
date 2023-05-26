import { Outlet, useParams } from "react-router-dom"
import iconDefault from "../../assets/images/icon-default.png"
import Error from "../Error"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import useGrab from "../../hooks/useGrab"
import axios from "axios"
import useAuthentication from "../../hooks/useAuthentication"
import moment from "moment"

const mockup = {
    1: {
        title: "วิศวกรรมซอฟต์แวร์",
        description: "นิสิตคิดว่าวิศวกรรมซอฟต์แวร์มีวิธีการที่ดีที่สุดหรือไม่ เพราะเหตุใด ?",
        created_at: "2021-05-01 12:00:00",
        post: [
            {
                id: 1,
                student: {
                    name: "Dirak Raksa",
                },
                post_at: "2021-05-01 12:00:00",
                content: "วิศวกรรมซอฟต์แวร์มีวิธีการที่ดีที่สุดคือ การเขียนโปรแกรมด้วยภาษา C# และใช้เทคโนโลยี .NET Framework ในการพัฒนาโปรแกรม",
                comments: [1,2,3],
            },
            {
                id: 2,
                student: {
                    name: "Jirakit Jirapongwanich",
                },
                post_at: "2021-05-01 12:00:00",
                content: "ไม่มีวิธีการใดที่ดีที่สุด แต่ละวิธี แนวทางต่างมีข้อดีและข้อเสีย ซึ่งเหมาะกับสถานการณ์ที่แตกต่างกันออกไป",
                comments: [1,2,3,4],
            },
            {
                id: 3,
                student: {
                    name: "Anuwat Nutra",
                },
                post_at: "2021-05-01 12:00:00",
                content: "วิธีการที่ดีที่สุดคือ Agile เพราะเป็นวิธีการใหม่ล่าสุด ในวิธีการพัฒนาซอฟต์แวร์ทั้งหมดทั้งมวล",
                comments: [],
            },
            {
                id: 4,
                student: {
                    name: "Nitrarapa Patranara",
                },
                post_at: "2021-05-01 12:00:00",
                content: "วิธีการที่ดีที่สุด คือ Spring Framework เพราะ Enterpise ใช้กันมากที่สุด",
                comments: [],
            },
        ]
    }
}

function toggleFullScreen(element) {
    if (!document.fullscreenElement) {
        element.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
}

function AuthorWriting({onNewPost}){
    const { user, loading } = useAuthentication()
    const { courseid, id } = useParams()
    const textRef = useRef();
    const postRef = useRef();
    const focusTextarea = () => {
      textRef.current.focus();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (textRef.current.value === "")
            return;
        const req = await axios.post(import.meta.env.VITE_SERVER + "/api/courses/:course_id/discussions/:discussion_id".replace(":course_id", courseid).replace(":discussion_id", id), {
            content: textRef.current.value,
        }, {
            headers: {
                authorization: localStorage.getItem("token"),
            }
        })
        onNewPost({
            content: textRef.current.value,
            user: user,
            datetime: new Date(),
            comments: [],
        })
        textRef.current.value = "";
    }
    if (loading){
        return <div>Loading ...</div>
    }
    return <form onSubmit={handleSubmit}>
        <div ref={postRef} onClick={focusTextarea} onDoubleClick={(e)=>{
        if (e.target !== textRef.current)
            toggleFullScreen(postRef.current);
    }} className="rounded-2xl border cursor-pointer bg-white dark:bg-slate-800 dark:border-transparent flex flex-col justify-between focus-within:ring-sky-500 focus-within:ring ring-offset-2 ">
        <div className="p-2 flex space-x-2">
            <div className="img">
                <img className="border-2 border-white shadow w-12 h-12 rounded-full" src={user.img ?? "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"} alt={"Your profile"} />
            </div>
            <div className="flex flex-col">
            <h5 className="font-bold">{user.first} {user.last} </h5>
            </div>
        </div>
        <div className="p-2 flex-1">
        <textarea ref={textRef} className="bg-inherit outline-none w-full h-full resize-none whitespace-pre" placeholder="Write your ideas ..." />
        </div>
        <div className="p-2 border-t border-slate-200 dark:border-slate-700 flex flex-row-reverse">
            <button className="bg-sky-500 hover:bg-sky-700 text-white px-4 py-2 rounded">Post</button>
        </div>
    </div>
    </form>
}

function DiscussionTopic() {
  const { courseid, id } = useParams()
  const [posts, setPosts] = useState([])
  const { data, error, loading } = useGrab({
    url: `/api/courses/${courseid}/discussions/${id}`,
  }, localStorage.getItem('token'), [])
  useEffect(()=>{
    if (data && data.posts){
        setPosts(data.posts.sort((a, b) => new Date(b.datetime) - new Date(a.datetime)))
    }
  }, [data])
  if (loading){
    return <div>Loading ...</div>
  }
  if (error){
    console.log(error)
    return <div>Error</div>
  }
  if (!loading && !data){
    return <Error error={"Not Found"} message={"Discussion topic is not found"}/>
  }
  const onNewPost = (postData) => {
    setPosts([postData, ...posts])
  }
  return (
    <div className="container mx-auto p-4">
        <h2 className="text-3xl my-2 font-bold">{data.discussion_title}</h2>
        <p className="mb-2">{data.discussion_description}</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 py-4">
            <AuthorWriting onNewPost={onNewPost}/>
            {posts?.map((post) => (
                <Link to={`./post/${post._id}`}>
                <div className="rounded-2xl h-fullcursor-pointer transition-transform hover:-translate-y-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent flex flex-col justify-between">
                    <div className="p-2 flex space-x-2">
                        <div className="img">
                            <img className="border-2 border-white shadow w-12 h-12 rounded-full" src={(post.user.img || "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg")} alt={post.user.first + ' ' + post.user.last} />
                        </div>
                        <div className="flex flex-col">
                        <h5 className="font-bold">{post.user.first} {post.user.last}</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{moment(post.datetime).fromNow()}</p>
                        </div>
                    </div>
                    <div className="p-2 flex-1">
                    <p className="whitespace-pre-wrap break-words">{post.content}</p>
                    </div>
                    <div className="p-2 border-t border-slate-200 dark:border-slate-700 flex">
                        <div className="inline-flex space-x-1 text-slate-500 dark:text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        <div>{post.comments?.length}</div>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
        <Outlet/>
    </div>
  )
}

export default DiscussionTopic