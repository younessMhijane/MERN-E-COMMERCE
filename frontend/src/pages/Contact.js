import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen md:flex bg-gradient-to-r from-violet-300 via-violet-200 to-violet-100 p-6">
      <div className='md:w-1/2'>
        {/* Introduction Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-violet-700 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700">
            At <b>La Reine Hijab</b>, we are dedicated to providing elegant and modest clothing for modern women. 
            If you have any questions or need assistance, we are here to help. Connect with us today!
          </p>
        </div>

        {/* Contact Information */}
        <div className="sm:flex flex-wrap justify-center gap-12 mb-12">
          <div className="flex items-center gap-4 text-gray-700">
            <FaPhoneAlt className="text-violet-500 text-2xl" />
            <div>
              <h3 className="font-bold">Phone</h3>
              <p>+212 6 44 44 30 90</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <FaEnvelope className="text-violet-500 text-2xl" />
            <div>
              <h3 className="font-bold">Email</h3>
              <p>test@lareinehijab.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <FaMapMarkerAlt className="text-violet-500 text-2xl" />
            <div>
              <h3 className="font-bold">Address</h3>
              <p>123, Avenue de la Mode, Midelt, Maroc</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-violet-700 mb-6">Follow Us on Social Media</h2>
          <div className="flex justify-center gap-8">
            <a
              href="https://web.facebook.com/profile.php?id=100093038531472&ref=xav_ig_profile_web&_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-violet-500 hover:bg-violet-700 transition-all duration-300 rounded-full p-4"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/la_reine_store_/?igsh=dTJwOTFzNGViZzll#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-violet-500 hover:bg-violet-700 transition-all duration-300 rounded-full p-4"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-violet-500 hover:bg-violet-700 transition-all duration-300 rounded-full p-4"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white w-full rounded-lg shadow-md p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-violet-700 mb-6">Send Us a Message</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-violet-500 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-violet-500 outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-violet-500 outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-violet-500 text-white py-3 rounded-md hover:bg-violet-700 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}