import NavBar from "../NavBar";

import { useLogin } from "../../hooks/useLogin";
import Link from "next/link";

export default function LoginPage() {
  const {
    formData,
    handleChange,
    loading,
    error,
    otpRequired,
    otp,
    setOtp,
    handleSubmit,
    handleVerifyOTP,
  } = useLogin();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link
                  href="/register"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  create a new account
                </Link>
              </p>
            </div>

            {otpRequired ? (
              <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter OTP sent to your email
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    aria-label="One-time password sent to your email"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-busy={loading || undefined}
                  >
                    {loading && (
                      <svg
                        className="h-4 w-4 animate-spin"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    )}
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </form>
            ) : (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your  email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(!formData.email) || undefined}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      aria-invalid={Boolean(!formData.password) || undefined}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-busy={loading || undefined}
                  >
                    {loading && (
                      <svg
                        className="h-4 w-4 animate-spin"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    )}
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
                {/* <div className="text-center mt-2">
                  <Link
                    href="/verify-otp"
                    className="text-sm text-green-600 hover:text-green-500"
                  >
                    Didn't get OTP? Resend
                  </Link>
                </div> */}
              </form>
            )}

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Islamic Finance Principles
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>
                  💰 No Interest (Riba) • 🤝 Profit & Loss Sharing • ✅ Real
                  Economic Activity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
