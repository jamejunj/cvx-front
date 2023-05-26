import React from 'react'

function License() {
  return (
    <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center text-center text-xs mt-8 mb-2">
        <p className="bg-gray-400 dark:bg-gray-700 text-white px-2 py-1 rounded mt-2 mb-4">Version 0.0.1</p>
        <p><a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Privacy Policy</a> updated on 21 May 2022</p>
        <p><a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Cookie Policy</a> updated on 21 May 2022</p>
        <hr className="my-2"/>
        <p>This is under development and not indicative product final version</p>
        <p>LMS and Online Course Platform within mycourseville.com are operated by <a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Learning Innovation Center, Chulalongkorn University</a></p>
    </div>
  )
}

export default License