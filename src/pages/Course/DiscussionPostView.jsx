import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import moment from "moment/moment"
import useGrab from "../../hooks/useGrab"
import axios from "axios"
import useAuthentication from "../../hooks/useAuthentication"

function Comment({comment, isReply}){
    const { user } = useAuthentication()
    const { id, courseid, post_id } = useParams()
    const textRef = useRef()
    const [replyTextbox, setReplyTextbox] = useState(false)
    const [replies, setReplies] = useState(comment.replies)
    const handleReply = () => {
        setReplyTextbox(!replyTextbox)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (textRef.current.value === "")
            return;
            const req = await axios.post(import.meta.env.VITE_SERVER + "/api/courses/:course_id/discussions/:discussion_id/:post_id/:comment_id".replace(":course_id", courseid).replace(":discussion_id", id).replace(":post_id", post_id).replace(':comment_id', comment._id), {
                content: textRef.current.value,
            }, {
                headers: {
                    authorization: localStorage.getItem("token"),
                }
            })
        setReplies([...replies, {
            user: user,
            content: textRef.current.value,
            datetime: new Date(),
        }])
        textRef.current.value = "";
    }
    return (
        <div className="p-2 flex space-x-2">
            <div className="img flex-shrink-0">
                <img className="border-2 border-white shadow w-12 h-12 rounded-full" src={comment.user?.img || "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"} alt={comment.user?.first} />
            </div>
            <div className="flex flex-col w-full">
                <h5 className="font-bold">{comment.user?.first} {comment.user?.last}</h5>
                <p className="mb-2 break-words">{comment.content}</p>
                <div className="flex space-x-2">
                    {!isReply && !comment.noreply && <button onClick={handleReply} className="text-xs text-sky-500 hover:underline">Reply</button>}
                    <p className="text-xs text-slate-500 dark:text-slate-400 ">{moment(comment.datetime).fromNow()}</p>
                </div>
                <div className="replys w-full flex flex-col">
                {replies && <div className="flex flex-col"> 
                    {replies.map((reply) => {
                        return <Comment key={reply._id} comment={reply} isReply />
                    })}
                </div>}
                {replyTextbox && user && <div className="p-2 flex space-x-2 items-center">
                        <div className="img">
                            <img className="border-2 border-white shadow w-12 h-12 rounded-full" src={user.img ? user.img : "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"} alt="Your profile" />
                        </div>
                        <div className="flex-1">
                            <form onSubmit={handleSubmit}>
                            <div className="flex">
                            <input ref={textRef}
                                className="w-full outline-none px-4 py-2 rounded-full bg-slate-100 focus:bg-slate-200 dark:bg-slate-800 dark:focus:bg-slate-700" 
                                type="text"
                                placeholder={`Reply to ${comment.user.first}'s comment`}
                            />
                            <button className="font-bold text-sky-500 hover:text-sky-400 px-4 py-2">Send</button>
                            </div>
                            </form>
                        </div>
                </div>}
                </div>
            </div>
        </div>
    )
}

function DiscussionPostView() {
  const textRef = useRef()
  const { user } = useAuthentication()
  const { courseid, id, post_id } = useParams()
  const navigate = useNavigate()
  const backdropRef = useRef()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const { data, error, loading } = useGrab({
    url: `/api/courses/${courseid}/discussions/${id}`,
  })
    useEffect(() => {
        if (!loading && !error && data.posts){
            const postData = data.posts.find((post) => post._id === post_id)
            setPost(postData)
            setComments(postData.comments)
        }
     }, [data])
  const backdropClick = (e) => {
    if (e.target === backdropRef.current) {
      navigate("..")
    }
  }
  if (loading){
    return <div>Loading ...</div>
  }
  if (error){
    console.log(error)
    return <div>Error</div>
  }
  const handleSubmit = async (e) => {
        e.preventDefault();
        if (textRef.current.value === "")
            return;
            const req = await axios.post(import.meta.env.VITE_SERVER + "/api/courses/:course_id/discussions/:discussion_id/:post_id/".replace(":course_id", courseid).replace(":discussion_id", id).replace(":post_id", post_id), {
                content: textRef.current.value,
            }, {
                headers: {
                    authorization: localStorage.getItem("token"),
                }
            })
        setComments([...comments, {
            content: textRef.current.value,
            user: user,
            datetime: new Date(),
            replies: [],
            noreply: true,
        }])
        textRef.current.value = "";
    }
  return (
    <>
    {user && post && <div ref={backdropRef} onClick={backdropClick} className="bg-black bg-opacity-50 fixed top-0 left-0 z-10 w-full h-full flex items-center justify-center">
        <div className="px-2 py-1 w-full flex flex-col justify-between mx-auto h-fit md:max-w-[80%] max-h-screen bg-white dark:bg-slate-900 rounded-2xl">
            {/* post section */}
            <div className="p-2 flex space-x-2">
                        <div className="img">
                            <img className="border-2 border-white shadow w-12 h-12 rounded-full"src={post.user?.img || "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"} alt={post.user?.first} />
                        </div>
                        <div className="flex flex-col flex-1">
                        <h5 className="font-bold">{post.user?.first} {post.user?.last}</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{moment(post.datetime).fromNow()}</p>
                        </div>
                        <button onClick={()=>navigate('./../..')} className="p-1.5 hover:bg-slate-200 rounded focus:outline-none focus:ring-4 ring-gray-200 text-slate-500">
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
            </div>
            <div className="p-2">
                <p className="whitespace-pre-wrap break-words">{post.content}</p>
            </div>
            {/* comment section section */}
            <div className="comment overflow-hidden overflow-y-auto divide-y divide-slate-200 dark:divide-slate-700 border-y border-slate-200 dark:border-slate-700">
                {comments && comments.map((comment) => {
                    return <Comment key={comment.comment_id} comment={comment} />
                })}
            </div>
            { /* add new comment */}
            <div className="p-2 flex space-x-2 items-center">
                    <div className="img">
                        <img className="border-2 border-white shadow w-12 h-12 rounded-full"src={ user.img ? user.img : "https://www.mycourseville.com/sites/all/modules/courseville/pict/default_platform_portrait.svg"} alt={user.first + ' ' + user.last} />
                    </div>
                    <div className="flex-1">
                        <form onSubmit={handleSubmit}>
                            <div className="flex">
                            <input ref={textRef}
                                className="w-full outline-none px-4 py-2 rounded-full bg-slate-100 focus:bg-slate-200 dark:bg-slate-800 dark:focus:bg-slate-700" 
                                type="text"
                                placeholder={`Write a comment`}
                            />
                            <button className="font-bold text-sky-500 hover:text-sky-400 px-4 py-2 rounded-full">Send</button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    </div>}
    </>
  )
}



export default DiscussionPostView