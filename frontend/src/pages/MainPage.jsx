import React from 'react'
import Sidebar from '../components/Sidebar'
import PostTable from '../components/PostTable'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
   
    <div className="flex">
      <Sidebar />
      <div
        className="flex  flex-col w-full border bg-gray-50  h-[
      100vh]"
      >
        <Navbar />
        <div className="p-4 space-y-8">
          <div className="flex justify-end md:mr-28 md:mt-4">
            <Link to={"/add-post"} className="p-3 font-bold text-gray-500 bg-gray-200 rounded-lg shadow-lg hover:cursor-pointer">
              {" "}
              + Add New Post
            </Link>
          </div>
          <PostTable />
        </div>
      </div>
    </div>
 
  )
}

export default MainPage