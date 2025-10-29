"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaSeedling,
  FaGem,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSiteContext } from "../context/SiteContext";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isAuthenticated, user, logout } = useSiteContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (user) {
      if (!user.is_approved || user.is_approved === 0) {
        // Route to main profile page which handles pending state
        router.push("/profile");
      } else {
        // For approved users, go to investor profile to see investments
        router.push("/profile");
      }
    }
    setIsDropdownOpen(false);
  };

  const getLinkClasses = (path) => {
    const isActive = pathname === path;
    const baseClasses =
      "px-3 py-2 transition-all duration-200 relative tracking-wide";

    if (isActive) {
      return `${baseClasses} text-green-400 font-semibold border-b-2 border-green-400`;
    }
    return `${baseClasses} hover:text-green-300 hover:border-b-2 hover:border-green-300/50`;
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? isScrolled
            ? "bg-gray-900/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
          : "bg-gray-900/95 backdrop-blur-sm shadow-lg"
      }`}
    >
      <nav
        className={`container mx-auto w-full flex justify-between items-center p-4 text-white transition-all duration-300 `}
      >
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="text-green-400">Krishi</span>Bazar
        </Link>

        <div className="flex space-x-2">
          <Link href="/" className={getLinkClasses("/")}>
            Home
          </Link>
          <Link href="/investments" className={getLinkClasses("/investments")}>
            Investment Opportunities
          </Link>
          <Link href="/shop" className={getLinkClasses("/shop")}>
            Farm Supplies
          </Link>
          <Link href="/products" className={getLinkClasses("/products")}>
            Products
          </Link>
          <Link href="/about" className={getLinkClasses("/about")}>
            About
          </Link>
          <Link href="/blog" className={getLinkClasses("/blog")}>
            Blogs
          </Link>
        </div>

        <div className="flex space-x-4 items-center">
          {isAuthenticated && user ? (
            <>
              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 border border-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                >
                  <span className="text-lg">
                    {user.usertype === 1 ? <FaSeedling /> : <FaGem />}
                  </span>
                  <span className="text-green-300 font-medium">
                    {user.last_name}
                  </span>
                  <FaChevronDown
                    className={`text-sm transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-200 hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <FaUser className="text-green-400" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-200 hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <FaSignOutAlt className="text-red-400" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Us
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
