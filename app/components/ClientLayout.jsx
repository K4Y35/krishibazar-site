"use client";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
