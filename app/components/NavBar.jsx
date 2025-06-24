import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        <div className="flex space-x-4">
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
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
