import React from 'react'
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full px-9 flex justify-between items-center bg-transparent fixed top-0 left-0 z-50 mt-3">
      <h1 className="text-2xl font-extrabold text-blue-800 tracking-wide">HELP ME TRAVEL</h1>
      <nav className="hidden md:flex space-x-6 font-medium">
        <NavLink to="/home" className="text-white hover:text-gray-600">Home</NavLink>
        <NavLink to="/destinations" className="text-white hover:text-gray-600">Destinations</NavLink>
        <NavLink to="/packages" className="text-white hover:text-gray-600">Community</NavLink>
        <NavLink to="/contact" className="text-white hover:text-gray-600">Review</NavLink>
      </nav>
      <Link>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
        Login / Register
        </button>
      </Link>
    </header>
  );
}

export default Header;
