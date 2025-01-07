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
    <div className="container mx-auto px-4 md:px-10 my-10 space-y-10">
      {/* User List Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">User List</h2>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <UserList />
        </div>
        <div className="text-center py-3 bg-gray-50">
          <Link
            to="/admin/userlist"
            className="inline-block px-6 py-2 rounded-full text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Show All Users
          </Link>
        </div>
      </div>

      {/* Product List Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Product List</h2>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <AllProducts />
        </div>
        <div className="text-center py-3 bg-gray-50">
          <Link
            to="/admin/allproductslist"
            className="inline-block px-6 py-2 rounded-full text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Show All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
