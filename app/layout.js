import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "./components/ClientLayout";
import { ToastContainer } from "react-toastify";
import { SiteProvider } from "./context/SiteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KrishiBazar - Islamic Farm Investment Platform",
  description:
    "Shariah-compliant agricultural investment platform connecting farmers and investors. Invest in real farming projects with profit-sharing based on Islamic finance principles.",
  keywords:
    "Islamic finance, farm investment, halal investment, Mudarabah, agricultural funding, Bangladesh farming",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteProvider>
          <ClientLayout>{children}</ClientLayout>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </SiteProvider>
      </body>
    </html>
  );
}
