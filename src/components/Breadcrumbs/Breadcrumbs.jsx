import { useLocation, useParams, Link } from "react-router-dom"

function getLi(token, tokens, index, params){
    const key = index;
    const url = tokens.slice(0, index+1).join('/')
    switch (token) {
        case 'course':
            return <li key={key} className="inline-flex items-center">
            <Link to={"/"} className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400">
              <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Home
            </Link>
          </li>
        case params.courseid:
            return <li key={key}>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link to={url} className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 md:ml-2 "> Course</Link>
            </div>
          </li>
        case 'content':
            return <li key={key}>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link to={url} className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 md:ml-2 "> Content</Link>
            </div>
          </li>
        case 'assignments':
            return <li key={key}>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link to={url} className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 md:ml-2"> Assignments</Link>
            </div>
          </li>
        case 'discussion':
            return <li key={key}>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link to={url} className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 md:ml-2"> Discussion</Link>
            </div>
          </li>
        case 'group':
            return <li key={key}>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link to={url} className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 md:ml-2"> Group</Link>
            </div>
          </li>
        case 'meeting':
            return <li key={key}>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link to={url} className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 md:ml-2"> Meeting</Link>
            </div>
          </li>
        case 'grade':
            return <li key={key}>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link to={url} className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 md:ml-2"> Grade</Link>
            </div>
          </li>
        case 'about':
            return <li key={key}>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link to={url} className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 md:ml-2"> About</Link>
            </div>
          </li>
    }
}

function Breadcrumbs() {
    const params = useParams()
    const location = useLocation()
    const tokens = location.pathname.split('/')
  return (
<nav className="flex px-5 py-3 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
    {tokens.map((t, i) => {
        return getLi(t, tokens, i, params)
    })}
  </ol>
</nav>
  )
}

export default Breadcrumbs