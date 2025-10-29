"use client";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ClientLayout({ children }) {
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

  // Only add padding-top when navbar has background (not transparent)
  const shouldAddPadding = !isHomePage || isScrolled;

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <NavBar />
      <main className={`flex-grow ${shouldAddPadding ? "pt-20" : ""}`}>
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
