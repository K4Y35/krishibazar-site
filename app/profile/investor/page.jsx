"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import {
  FaGem,
  FaDollarSign,
  FaSeedling,
  FaChartLine,
  FaCheckCircle,
  FaTrophy,
  FaRocket,
  FaChartBar,
  FaBell,
} from "react-icons/fa";

export default function InvestorProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and get user data
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/auth/login");
      return;
    }

    const parsedUser = JSON.parse(userData);

    // Check if user is approved and is an investor
    if (!parsedUser.is_approved) {
      router.push("/profile/pending");
      return;
    }

    if (parsedUser.usertype !== 2) {
      router.push("/auth/login");
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-green-600">
          <NavBar />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700">
        <NavBar />
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 pb-32">
        <div className="absolute inset-0">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-full w-full opacity-90"></div>
        </div>
        <div className="relative max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">
                  <FaGem />
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Welcome back, {user.first_name}!
                </h1>
                <p className="text-blue-100 mt-1">Investor Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-2 rounded-lg text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        {/* Main Profile Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Investment Portfolio
              </h2>
              <p className="text-gray-600">
                Track your investments and explore new opportunities
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Invested</p>
                    <p className="text-2xl font-bold">৳1,25,000</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <span className="text-2xl">
                      <FaDollarSign />
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Active Projects</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <span className="text-2xl">
                      <FaSeedling />
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm">Returns (ROI)</p>
                    <p className="text-2xl font-bold">18.5%</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <span className="text-2xl">
                      <FaChartLine />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {user.first_name} {user.last_name}
                    </dd>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      Phone Number
                    </dt>
                    <dd className="text-base text-gray-900">{user.phone}</dd>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      Email Address
                    </dt>
                    <dd className="text-base text-gray-900">{user.email}</dd>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      User Type
                    </dt>
                    <dd className="text-base text-gray-900">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <FaGem /> Investor
                      </span>
                    </dd>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      Account Status
                    </dt>
                    <dd className="text-base text-gray-900">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                        <FaCheckCircle /> Verified & Approved
                      </span>
                    </dd>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      Investment Tier
                    </dt>
                    <dd className="text-base text-gray-900">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        <FaTrophy /> Premium
                      </span>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center py-16">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-6">
                <span className="text-4xl">
                  <FaRocket />
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Advanced Investment Tools Coming Soon!
              </h2>

              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                We're developing powerful investment management and analytics
                tools to help you maximize your returns. Stay tuned for
                portfolio tracking, project discovery, and more!
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <FaDollarSign /> Portfolio Tracking
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <FaSeedling /> Project Discovery
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <FaChartBar /> Advanced Analytics
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <FaGem /> Premium Opportunities
                </span>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <p className="text-sm text-gray-700">
                  <strong>
                    <FaBell /> Get notified:
                  </strong>{" "}
                  We'll email you when these investment tools are ready!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
