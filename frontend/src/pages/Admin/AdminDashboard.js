import React, { useState } from 'react';
import UserList from './UserList';
import AllProducts from './AllProducts';
import OrdersManager from './OrdersManager';
import { useAllProductsQuery } from '../../Redux/api/productApiSlice';
import { useGetUsersQuery } from '../../Redux/api/usersApiSlice';
import { useGetOrdersQuery } from '../../Redux/api/orderApiSlice';
import Loading from '../../components/Loading';
import { FaPlus } from 'react-icons/fa';
export default function AdminDashboard() {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu
  const [activeSection, setActiveSection] = useState('products'); // Section active (AllProducts, UserList, Orders)

  // Requêtes
  const { isLoading: isProductsLoading } = useAllProductsQuery();
  const { isLoading: isUsersLoading } = useGetUsersQuery();
  const { isLoading: isOrderLoading } = useGetOrdersQuery();

  // Si les données sont en cours de chargement, afficher le composant Loading
  if (isProductsLoading || isUsersLoading || isOrderLoading) {
    return <Loading />;
  }

  // Gérer le clic sur une option dans le menu déroulant
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setDropdownOpen(false); // Fermer le menu après sélection
  };

  return (
    <div className="relative px-4 md:px-10 p-5 space-y-10 bg-gradient-to-r from-violet-300 via-violet-200 to-violet-100">
      <div className="absolute right-5"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
      <div className='flex justify-end'>
        <div
          className={`bg-violet-800 flex justify-center items-center h-8 w-8 rounded-full transition-all duration-300 shadow-lg cursor-pointer hover:bg-violet-700 ${
            isDropdownOpen ? 'rotate-45' : ''}`}
        >
          <FaPlus className="h-6 w-6 text-white" />
        </div>
      </div>

      {isDropdownOpen && (
        <div
          className="mt-2 bg-violet-50 shadow-lg rounded-lg w-48 border border-gray-200 transition-transform duration-300"
        >
          <ul className="space-y-2 p-4">
            <li
              onClick={() => handleSectionChange('products')}
              className="cursor-pointer text-gray-700 hover:text-violet-500 hover:font-semibold transition-all duration-200"
              role="menuitem"
            >
              All Products
            </li>
            <li
              onClick={() => handleSectionChange('users')}
              className="cursor-pointer text-gray-700 hover:text-violet-500 hover:font-semibold transition-all duration-200"
              role="menuitem"
            >
              User List
            </li>
            <li
              onClick={() => handleSectionChange('orders')}
              className="cursor-pointer text-gray-700 hover:text-violet-500 hover:font-semibold transition-all duration-200"
              role="menuitem"
            >
              Orders
            </li>
          </ul>
        </div>
      )}
    </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {activeSection === 'products' && (
          <div>
            <AllProducts />
          </div>
        )}

        {activeSection === 'users' && (
          <div>
            <UserList />
          </div>
        )}

        {activeSection === 'orders' && (
          <div>
            <OrdersManager />
          </div>
        )}
      </div>
    </div>
  );
}
