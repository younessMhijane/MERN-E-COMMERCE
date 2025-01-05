import React from 'react'
import UserList from './UserList'
import AllProducts from './AllProducts'
import { Link } from 'react-router-dom'
import { useAllProductsQuery } from '../../Redux/api/productApiSlice'
import Loading from '../../components/Loading'
import { useGetUsersQuery } from '../../Redux/api/usersApiSlice'
export default function AdminDashboard() {
  const { isLoading: isProductsLoading } = useAllProductsQuery();
  const { isLoading: isUsersLoading } = useGetUsersQuery();
  
  if (isProductsLoading || isUsersLoading) {
    return <Loading />;
  }
  
  return (
    <div className='md:mx-20 space-y-6 my-20'>

      {/* Section UserList */}
      <div className='h-72'>
        <div className='max-h-96 overflow-y-auto border rounded shadow'>
          <UserList />
        </div>
        <div className=' text-center mt-2'>
          <Link to='/admin/userlist' className=' transition-all duration-300 px-4 py-1 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white'>Show all</Link>
        </div>
      </div>

      {/* Section AllProducts */}
      <div>
        <div className='max-h-96 overflow-y-auto border rounded shadow'>
          <AllProducts />
        </div>
        <div className='text-center mt-2'>
          <Link to='/admin/allproductslist' className='px-4 py-1 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white  transition-all duration-300'>Show all</Link>
        </div>
      </div>

    </div>
  )
}
