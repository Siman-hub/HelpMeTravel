import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full h-16 px-9 flex justify-between items-center bg-transparent relative top-0 left-0 z-50">
      <h1 className="text-2xl font-extrabold text-blue-800 tracking-wide">
        HELP ME TRAVEL
      </h1>
      <nav className="hidden md:flex space-x-6 font-medium">
        <NavLink to="/home" className="text-black hover:text-gray-600 py-2">
          Home
        </NavLink>
        <NavLink to="/reviews" className="text-black hover:text-gray-600 py-2">
          Review
        </NavLink>
        <a href="#adventure">
          <button className="text-black py-2">
            Explore Adventure
          </button>
        </a>
      </nav>

      <Link to="/login">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
          Login / Register
        </button>
      </Link>
    </header>
  );
}

export default Header;
