import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">About Us</h2>
          <p className="text-sm leading-relaxed">
            Welcome to our e-commerce store, where you’ll find high-quality products at the best prices. 
            Our mission is to make your shopping experience simple, fast, and secure.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/about"
                className="hover:text-violet-500 transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-violet-500 transition-all duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-violet-500 transition-all duration-300"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-violet-500 transition-all duration-300"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://web.facebook.com/profile.php?id=100093038531472&ref=xav_ig_profile_web&_rdc=1&_rdr"
              className="bg-gray-800 hover:bg-violet-500 text-white p-3 rounded-full transition-all duration-300 shadow-md"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="bg-gray-800 hover:bg-violet-500 text-white p-3 rounded-full transition-all duration-300 shadow-md"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/la_reine_store_/?igsh=dTJwOTFzNGViZzll#"
              className="bg-gray-800 hover:bg-violet-500 text-white p-3 rounded-full transition-all duration-300 shadow-md"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              className="bg-gray-800 hover:bg-violet-500 text-white p-3 rounded-full transition-all duration-300 shadow-md"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm border-t border-gray-800 pt-6">
        <p>&copy; {new Date().getFullYear()} Your Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
