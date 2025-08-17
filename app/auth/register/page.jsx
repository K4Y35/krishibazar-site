"use client";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import { useRegister } from "../../hooks/useRegister";
import { getImageUrl } from "../../utils";

export default function RegisterPage() {
  const {
    register,
    errors,
    imagePreview,
    loading,
    success,
    watchedUserType,
    updateUserType,
    removeImage,
    handleImageChange,
    handleRegister,
    handleImageUpload,
  } = useRegister();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600">
        <NavBar />
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Join KrishiBazar
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/auth/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => updateUserType(1)}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    watchedUserType === 1
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 hover:border-green-300"
                  }`}
                >
                  <div className="text-2xl mb-2">🚜</div>
                  <div className="font-semibold">Farmer</div>
                  <div className="text-xs text-gray-500">
                    Get funding for projects
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => updateUserType(2)}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    watchedUserType === 2
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <div className="text-2xl mb-2">💼</div>
                  <div className="font-semibold">Investor</div>
                  <div className="text-xs text-gray-500">
                    Invest in farm projects
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  {...register("first_name", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                  type="text"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="First name"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  {...register("last_name", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                  type="text"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Last name"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Please enter a valid Bangladeshi phone number",
                  },
                })}
                type="tel"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="01XXXXXXXXX"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NID Front Side
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview.nid_front ? (
                      <div className="relative">
                        <img
                          src={imagePreview.nid_front}
                          alt="NID Front Preview"
                          className="max-h-40 mx-auto"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage("nid_front")}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="nid_front"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                          >
                            <span>Upload front side</span>
                            <input
                              id="nid_front"
                              name="nid_front"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NID Back Side
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview.nid_back ? (
                      <div className="relative">
                        <img
                          src={imagePreview.nid_back}
                          alt="NID Back Preview"
                          className="max-h-40 mx-auto"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage("nid_back")}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="nid_back"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                          >
                            <span>Upload back side</span>
                            <input
                              id="nid_back"
                              name="nid_back"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your password (min 6 characters)"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value, formValues) =>
                    value === formValues.password || "Passwords do not match",
                })}
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                onClick={handleRegister}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              By registering, you agree to our Islamic finance principles of
              profit and loss sharing without interest (riba).
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Shariah Compliant Platform
                </span>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                🕌 Halal Investment • 🤝 Fair Profit Sharing • ✅ Real
                Agricultural Impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
