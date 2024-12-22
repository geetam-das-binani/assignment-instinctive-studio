import React from 'react'
import Navbar from '../components/Navbar'
import ProfileForm from '../components/ProfileForm'
import Sidebar from '../components/Sidebar'


const ProfilePage = () => {
   
  return (
    <div className="flex">
      <Sidebar />
      <div
        className="flex  flex-col w-full border bg-gray-50  h-[
      100vh]"
      >
        <Navbar />
        <div className="p-4 space-y-8">
          
         <ProfileForm/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage