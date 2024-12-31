import React from 'react'
import UserList from './UserList'
export default function AdminDashboard() {
  return (
    <div>

      {/* UserList */}
      <div className='md:mx-20 '>
      <UserList/>
      </div>
    </div>
  )
}
