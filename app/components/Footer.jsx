import Link from "next/link";
import {
  FaMosque,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";
import {
  MdAgriculture,
  MdMonitor,
  MdStore,
  MdTrendingUp,
} from "react-icons/md";
import { GiCow, GiFarmer, GiWheat } from "react-icons/gi";
import { BsShieldCheck } from "react-icons/bs";
import { IoLeafOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                Krishi<span className="text-white">Bazaar</span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Connecting farmers and investors through Shariah-compliant
                Islamic finance. Building a sustainable agricultural economy
                with ethical investment principles.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/investments"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Investment Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Farm Supplies
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register?role=farmer"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Join as Farmer
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register?role=investor"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Become Investor
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/financing"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Islamic Farm Financing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/advisory"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Agricultural Advisory
                </Link>
              </li>
              <li>
                <Link
                  href="/services/marketplace"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Farm Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/services/monitoring"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Farm Monitoring
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Educational Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Stay Connected
            </h4>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-green-400" />
                <a
                  href="mailto:contact@krishibazaar.com"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  contact@krishibazaar.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-green-400" />
                <a
                  href="tel:+8801234567890"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  +880 123 456 7890
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-green-400" />
                <span className="text-gray-300 text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="text-sm font-semibold mb-3 text-white">
                Follow Us
              </h5>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-sm text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-sm text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-sm text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-sm text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-sm text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="w-full text-center lg:text-left">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} KrishiBazaar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
