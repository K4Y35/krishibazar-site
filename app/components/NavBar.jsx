import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSeedling, FaGem } from "react-icons/fa";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  const handleProfileClick = () => {
    if (user) {
      if (!user.is_approved) {
        router.push("/profile/pending");
      } else {
        if (user.usertype === 1) {
          router.push("/profile/farmer");
        } else if (user.usertype === 2) {
          router.push("/profile/investor");
        }
      }
    }
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
          {isLoggedIn && user ? (
            <>
              {/* User Profile Info */}
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 border border-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
              >
                <span className="text-lg">
                  {user.usertype === 1 ? <FaSeedling /> : <FaGem />}
                </span>
                <span className="text-green-300 font-medium">
                  {user.first_name} {user.last_name}
                </span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login and Join Us buttons for non-logged in users */}
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
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
