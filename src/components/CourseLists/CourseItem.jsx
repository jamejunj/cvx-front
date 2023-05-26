import { Link } from 'react-router-dom'
import iconDefault from '../../assets/images/icon-default.png'
import moocDefault from '../../assets/images/mooc-default.svg'
function CourseItem({course, grid}) {
    return (
      <Link className="block" to={"/course/" + course.course_id}>
          <div className={`group border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 border-2 rounded-2xl cursor-pointer transition-all duration-100 hover:-translate-y-1 hover:shadow-md flex flex-col gap-2 overflow-hidden ${course.mooc ? 'hover:border-pink-500 dark:hover:border-pink-400 ' : 'hover:border-sky-500 dark:hover:border-sky-400'}`}>
              <div className="flex flex-col items-center">
                  <div className="h-32 overflow-hidden w-full bg-sky-200">
                    <img className="object-cover h-full w-full" src={course.course_image} alt="" />
                  </div>
                  <div className="w-full p-4 overflow-hidden">
                      <div className="font-bold text-lg overflow-hidden whitespace-nowrap text-ellipsis">{course.course_name}</div>
                      <div className="text-slate-500 dark:text-slate-400">{course.course_code}</div>
                      <div className="flex items-end justify-between">
                      <div className="relative flex space-x-2 mt-2">
                            <div className="text-sm">
                                {course.course_instructors.length > 1 ? course.course_instructors.map(instructor=>(instructor.first)).slice(0,1).join(', ') + (course.course_instructors.length > 1 ? ' and ' + (course.course_instructors.length-1) + ' more' : '') : course.course_instructors[0].first + ' ' + course.course_instructors[0].last }
                            </div>
                            <div className="flex -space-x-2">
                         {/* {course.authors.slice(0,3).map((author, index)=>{
                                 return <img key={index} className="w-8 h-8 rounded-full bg-slate-100 ring-1 ring-white shadow-md shadow-slate-400" src={author.img} alt={author.name}/>
                             })}
                             {course.authors.length > 3 ? <div className="flex justify-center items-center w-8 h-8 text-xs font-medium text-white bg-gray-500 rounded-full ring-2 ring-white shadow-md shadow-slate-400" href="#">+{course.authors.length-3}</div> : null} */}
                         </div>
                        </div>
                        <div className="h-32 flex flex-col-reverse">
                        {course.course_mooc && <img className="w-16 h-16" src={moocDefault} alt="MOOC icon" />}
                        </div>
                      </div>
                      
                  </div>
              </div>
          </div>
      </Link>
    )
  }
// function CourseItem({course, grid}) {
//   return (
//     <Link className="block" to={"/course/" + course.id}>
//         <div className="group border-slate-200 bg-white hover:border-sky-500 border-2 rounded-md cursor-pointer transition-all duration-100 hover:-translate-y-1 hover:shadow-md hover:shadow-sky-200 flex flex-col gap-2">
//             <div className="flex items-center">
//                 <div className="w-16 h-16 m-2">
//                 <img className="w-full h-full" src={iconDefault} alt={course.name + "'s image"}/>
//                 </div>
//                 <div className="w-full p-4 overflow-hidden">
//                     <div className="font-bold text-lg overflow-hidden whitespace-nowrap	text-ellipsis">{course.name}</div>
//                     <div className="text-slate-500">{course.id}</div>
//                     <div className="relative flex space-x-2 mt-2">
//                         <div className="flex -space-x-2">
//                         {course.authors.slice(0,3).map((author, index)=>{
//                                 return <img key={index} className="w-8 h-8 rounded-full bg-slate-100 ring-2 ring-white shadow-md shadow-slate-400" src={author.img} alt={author.name}/>
//                             })}
//                             {course.authors.length > 3 ? <div className="flex justify-center items-center w-8 h-8 text-xs font-medium text-white bg-gray-500 rounded-full ring-2 ring-white shadow-md shadow-slate-400" href="#">+{course.authors.length-3}</div> : null}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </Link>
//   )
// }

export default CourseItem