"use client";
import Link from "next/link";
import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";

export default function Profile() {
  const {
    loading,
    isAuthenticated,
    logout,
    userStatus,
    normalizedUser,
    isPending,
    userTypeLabel,
    changing,
    changeError,
    changeSuccess,
    passwordForm,
    setPasswordForm,
    handlePasswordChange,
  } = useProfile();

  const [showChangePassword, setShowChangePassword] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-600">
          <svg
            className="h-5 w-5 animate-spin text-green-600"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Loading your profile...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11c.5304 0 1.0391-.2107 1.4142-.5858C13.7893 10.0391 14 9.5304 14 9c0-.5304-.2107-1.0391-.5858-1.4142C13.0391 7.2107 12.5304 7 12 7c-.5304 0-1.0391.2107-1.4142.5858C10.2107 7.9609 10 8.4696 10 9c0 .5304.2107 1.0391.5858 1.4142C10.9609 10.7893 11.4696 11 12 11z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"
            />
          </svg>
          <span>Redirecting to login...</span>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              My Profile
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your account information and settings
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.516 11.59c.75 1.334-.213 2.99-1.743 2.99H3.484c-1.53 0-2.493-1.656-1.743-2.99L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a.75.75 0 01-.75-.75V8.5a.75.75 0 011.5 0v2.75A.75.75 0 0110 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Pending Approval
                </h2>
                <p className="text-gray-600 mt-2">
                  Your account is currently under review. You will be notified
                  once an administrator approves your account.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    href="/"
                    className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-gray-500">Status</p>
                <p className="mt-1 font-medium text-yellow-700">Pending</p>
              </div>
              {normalizedUser?.email && (
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-500">Email</p>
                  <p className="mt-1 font-medium text-gray-800">
                    {normalizedUser.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            My Profile
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Manage your account and activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
              <div className="h-16 w-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold ring-2 ring-white shadow">
                {normalizedUser?.first_name?.[0]?.toUpperCase() ||
                  normalizedUser?.last_name?.[0]?.toUpperCase() ||
                  "U"}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {normalizedUser?.first_name
                  ? `${normalizedUser.first_name} ${
                      normalizedUser?.last_name || ""
                    }`
                  : normalizedUser?.last_name || "User"}
              </h2>
      
              {normalizedUser?.email && (
                <p className="text-gray-500 mt-1">{normalizedUser.email}</p>
              )}
              {normalizedUser?.phone && (
                <p className="text-gray-500 mt-1">📞 {normalizedUser.phone}</p>
              )}

              <div className="mt-6 space-y-2">
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePassword((v) => !v)}
                  className="w-full px-4 py-2 bg-red-400 text-white rounded-md hover:bg-green-700"
                  aria-expanded={showChangePassword}
                  aria-controls="change-password-section"
                >
                  Change Password
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900">Dashboard</h3>
              <p className="text-gray-600 mt-1">Your account is approved.</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/profile/investor"
                  className="block p-5 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        My Investments
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        View portfolio & reports
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/investments"
                  className="block p-5 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        Browse Opportunities
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Explore new projects
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/profile/orders"
                  className="block p-5 rounded-lg border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        My Orders
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Track products & supplies
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Account Information
              </h3>
              <p className="text-gray-600 mt-1">Your basic details</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-500">Full Name</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {normalizedUser?.first_name || normalizedUser?.last_name
                      ? `${normalizedUser?.first_name || ""} ${
                          normalizedUser?.last_name || ""
                        }`.trim()
                      : "—"}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-500">Email</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {normalizedUser?.email || "—"}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-500">Phone</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {normalizedUser?.phone || "—"}
                  </p>
                </div>
               
              </div>
            </div>

            {normalizedUser?.usertype === 1 && (
              <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900">Farmer Tools</h3>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  <li>List new crops and manage inventory</li>
                  <li>Track orders and deliveries</li>
                </ul>
              </div>
            )}

            {normalizedUser?.usertype === 2 && (
              <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900">Investor Tools</h3>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  <li>Explore and manage investment opportunities</li>
                  <li>View performance and payouts</li>
                </ul>
                <div className="mt-4">
                  <Link
                    href="/profile/investor"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    View My Investments
                  </Link>
                </div>
              </div>
            )}

            <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
              {changeError && (
                <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
                  {changeError}
                </div>
              )}
              {changeSuccess && (
                <div className="mt-3 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded">
                  {changeSuccess}
                </div>
              )}
              {showChangePassword && (
                <form
                  id="change-password-section"
                  className="mt-4 grid grid-cols-1 gap-4"
                  onSubmit={handlePasswordChange}
                >
                  <div>
                    <label className="block text-sm text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.current_password}
                      onChange={(e) =>
                        setPasswordForm((p) => ({
                          ...p,
                          current_password: e.target.value,
                        }))
                      }
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.new_password}
                      onChange={(e) =>
                        setPasswordForm((p) => ({
                          ...p,
                          new_password: e.target.value,
                        }))
                      }
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirm_password}
                      onChange={(e) =>
                        setPasswordForm((p) => ({
                          ...p,
                          confirm_password: e.target.value,
                        }))
                      }
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={changing}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                      {changing ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}