"use client";
import Link from "next/link";
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

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading your profile...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Redirecting to login...</div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold">
              !
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Account Pending Approval</h2>
              <p className="text-gray-600 mt-2">
                Your account is currently under review. You will be notified once an administrator approves your account.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-sm text-gray-500">
            <p>
              Status: <span className="font-medium text-yellow-700">Pending</span>
            </p>
            {user?.email && (
              <p className="mt-1">Email: <span className="font-medium text-gray-700">{user.email}</span></p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="h-16 w-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
              {normalizedUser?.first_name?.[0]?.toUpperCase() || normalizedUser?.last_name?.[0]?.toUpperCase() || "U"}
            </div>
            <h1 className="mt-4 text-xl font-semibold text-gray-900">
              {normalizedUser?.first_name ? `${normalizedUser.first_name} ${normalizedUser?.last_name || ""}` : normalizedUser?.last_name || "User"}
            </h1>
            <p className="text-gray-600">{userTypeLabel}</p>
            {normalizedUser?.email && <p className="text-gray-500 mt-1">{normalizedUser.email}</p>}
            {normalizedUser?.phone && <p className="text-gray-500 mt-1">📞 {normalizedUser.phone}</p>}
            {normalizedUser?.id && <p className="text-gray-400 mt-1 text-sm">ID: {normalizedUser.id}</p>}

            <div className="mt-6 space-y-2">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Edit Profile</button>
              <button onClick={logout} className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Logout</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-1">Welcome back! Your account is approved.</p>

            {/* Quick Action Cards - Always Visible */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/profile/investor"
                className="block p-6 border-2 border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">My Investments</h3>
                    <p className="text-sm text-gray-600 mt-1">View portfolio & reports</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/investments"
                className="block p-6 border-2 border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Browse Opportunities</h3>
                    <p className="text-sm text-gray-600 mt-1">Explore new projects</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/profile/orders"
                className="block p-6 border-2 border-orange-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">My Orders</h3>
                    <p className="text-sm text-gray-600 mt-1">Track products & supplies</p>
                  </div>
                </div>
              </Link>
            </div>

            {normalizedUser?.usertype === 1 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Farmer Tools</h3>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  <li>List new crops and manage inventory</li>
                  <li>Track orders and deliveries</li>
                </ul>
              </div>
            )}

            {normalizedUser?.usertype === 2 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Investor Tools</h3>
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

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              {changeError && (
                <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">{changeError}</div>
              )}
              {changeSuccess && (
                <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">{changeSuccess}</div>
              )}
              <form className="mt-4 grid grid-cols-1 gap-4" onSubmit={handlePasswordChange}>
                <div>
                  <label className="block text-sm text-gray-700">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, current_password: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, new_password: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirm_password}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, confirm_password: e.target.value }))}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}