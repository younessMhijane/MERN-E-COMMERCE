import React from 'react'
import HomePic from '../asserts/HomePic.png'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa';
import Footer from '../components/Footer';
export default function PageHome() {

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

  <Footer/>
    </>

  )
}
