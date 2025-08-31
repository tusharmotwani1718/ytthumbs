// Header.jsx

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Examples", to: "/examples" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseClasses =
    "transition font-semibold text-lg px-2 py-1 rounded-md";
  const activeClasses = "text-red-400";
  const inactiveClasses = "text-gray-200 hover:text-red-400";

  return (
    <header className="bg-gradient-to-br from-[#232526] to-[#191414] backdrop-blur-lg shadow-lg">
      <div className="mx-auto px-4 md:px-8 flex justify-between items-center h-20 max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="block h-8 w-8 bg-red-600 rounded-full" />
          <span className="text-3xl font-extrabold text-red-500 tracking-widest drop-shadow-md">
            YTThumbs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
              end
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow focus:ring-2 focus:ring-red-500 transition flex items-center"
          >
            Login
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Open main menu"
          className="md:hidden text-gray-300 p-2 rounded-lg hover:bg-[#2c0a0a] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <nav className="md:hidden bg-[#232326] bg-opacity-95 backdrop-blur-xl shadow-2xl absolute w-full top-20 left-0 z-40 transition-all duration-300 animate-slide-down">
          <ul className="flex flex-col items-center p-6 space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `text-lg font-bold py-2 px-6 rounded-md ${
                      isActive
                        ? "text-red-400"
                        : "text-gray-100 hover:text-red-400"
                    }`
                  }
                  end
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
