import React, { useEffect } from 'react';
import HomePic from '../asserts/HomePic.png';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Footer from '../components/Footer';
import TopProducts from '../components/TopProducts';
import moment from 'moment';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAllProductsQuery } from '../Redux/api/productApiSlice';

export default function PageHome() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data: products } = useAllProductsQuery();

  const limitedProducts = products?.slice(0, 4);

  return (
    <>
      <div className="shadow-md inset bg-gradient-to-r from-violet-500 via-violet-400 to-violet-300 p-4">
        <div className="flex flex-col sm:flex-row h-auto md:h-[500px]">
          {/* Texte avec animation */}
          <div 
            className="w-full sm:w-[50%] flex flex-col justify-center items-start px-4 sm:px-8 mb-4 sm:mb-0" 
            data-aos="fade-right" 
            data-aos-duration="1000"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center sm:text-left">
              Welcome to La Reine
            </h2>
            <p className="text-lg text-gray-600 mb-6 text-center sm:text-left">
              Discover a unique collection of carefully selected products. Whether you're looking for trendy new items or timeless essentials, 
              you'll find everything you need to complete your style and everyday life.
            </p>
            <Link 
              to="/products" 
              className="flex gap-1 text-violet-800 font-semibold hover:underline text-center sm:text-left"
            >
              Shop Now <FaArrowRight className="h-6 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Image avec animation */}
          <div 
            className="w-full sm:w-[50%] flex justify-center overflow-hidden relative" 
            data-aos="fade-left" 
            data-aos-duration="1000"
          >
            <div 
              className="bg-violet-accent absolute h-96 w-96 sm:h-[380px] sm:w-[380px] bottom-[-80px] rounded-full shadow-lg animate-pulse"
            ></div>
            
            <img 
              alt="HomePic" 
              src={HomePic} 
              className="drop-shadow-3xl sm:max-w-full sm:h-auto h-96 transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div data-aos="fade-up">
        <TopProducts />
      </div>
      <div>
        <h2 data-aos="fade-up" className="text-2xl md:pb-5 font-semibold text-indigo-700 text-center mb-8">
          All Products
        </h2>
        <div data-aos="fade-up" className='container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {limitedProducts?.map((product) => (
            <div key={product._id} data-aos="fade-up">
              <div className="bg-indigo-50 shadow-md rounded-lg p-4 transform transition-transform duration-300 relative group">
                <div className="relative overflow-hidden rounded-md">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full hover:cursor-pointer h-80 object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </Link>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <h5 className="text-lg font-semibold text-gray-800 truncate">
                      {product?.name}
                    </h5>
                    <p className="text-gray-500 text-xs">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {product?.description?.substring(0, 20)}...
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-indigo-600 font-bold">
                      {product?.priceSale && product?.priceSale > 0 ? (
                        <>
                          <span className="text-red-500 line-through">{product?.price?.toFixed(2)} DH</span>
                          <span className="ml-2">{product?.priceSale?.toFixed(2)} DH</span>
                        </>
                      ) : (
                        `${product?.price?.toFixed(2)} DH`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center my-6">
        <Link 
          to="/products" 
          className="text-violet-800 font-semibold hover:underline"
        >
          View All Products <FaArrowRight className="inline-block ml-2" />
        </Link>
      </div>

      <Footer />
    </>
  );
}
