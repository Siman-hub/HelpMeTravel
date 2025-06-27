import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

function Header() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/home');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="w-full h-16 px-9 flex justify-between items-center bg-white shadow sticky top-0 z-50">
      <h1 className="text-2xl font-extrabold text-blue-800 tracking-wide">
        HELP ME TRAVEL
      </h1>

      <nav className="hidden md:flex space-x-6 font-medium">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-black hover:text-gray-600"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-black hover:text-gray-600"
          }
        >
          Review
        </NavLink>
        <a href="#adventure" className="text-black hover:text-gray-600">
          Explore Adventure
        </a>
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700 hidden md:block">
              Welcome, {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
              Login / Register
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
