import iconDefault from '../assets/images/icon-default.png'
import useNotification from '../hooks/useNotification';
import Kind from '../utils/Kind';
import moment from 'moment';
import { Link } from 'react-router-dom';
function Notification() {
  const { notifications, unread, loading, error, tick } = useNotification();
  return (
    <div className="container mx-auto p-4">
        <div className="mx-auto max-w-lg bg-white dark:bg-slate-800 shadow rounded">
            <div className="p-2 border-b border-slate-200 dark:border-slate-600">
                <h5 className="p-2 font-bold text-lg">Notification</h5>
            </div>
            <div className="p-2">
                <ul>
                  {notifications && notifications.map((notification, index) => {
                    return <NotificationItem key={index} notification={notification} />
                  })}
                  {notifications && notifications.length === 0 && <div className="text-slate-500 dark:text-slate-400 text-center my-2">
                  <div className="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                  </svg>
                  </div>
                  <h5 className="text-xl">No new activity!</h5>
                  <p className="text-sm">No new activity in past 14 days</p>
                  </div>}
                </ul>
            </div>
        </div>
    </div>
  )
}

function NotificationItem({notification}){
  const message = notification['message']['message'];
  const timestamp = notification.timestamp;
  return <li className=""><Link to={message.link} className="block hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded">
                    <div className="flex space-x-4 p-2">
                      <div className="icon relative">
                        <Kind type={message.type} className="w-10 h-10"/>
                      </div>
                      <div className="flex flex-col justify-between">
                        <p><strong>{message.course_name}</strong> {message.message}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{moment(timestamp).fromNow()}</p>
                      </div>
                    </div>
                  </Link></li>
}

export default Notification