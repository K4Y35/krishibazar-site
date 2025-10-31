import { useRegister } from "../../hooks/useRegister";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const {
    register,
    errors,
    imagePreview,
    loading,
    success,
    handleImageChange,
    removeImage,
    handleSubmit,
  } = useRegister();

  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Join KrishiBazar
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link
                  href="/login"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  sign in to your existing account
                </Link>
              </p>
            </div>

            <div className="mt-8">
              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      aria-invalid={Boolean(errors.first_name) || undefined}
                      aria-describedby={
                        errors.first_name ? "first_name-error" : undefined
                      }
                    />
                    {errors.first_name && (
                      <p
                        id="first_name-error"
                        className="mt-1 text-sm text-red-600"
                      >
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
                      aria-invalid={Boolean(errors.last_name) || undefined}
                      aria-describedby={
                        errors.last_name ? "last_name-error" : undefined
                      }
                    />
                    {errors.last_name && (
                      <p
                        id="last_name-error"
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      aria-invalid={Boolean(errors.email) || undefined}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600">
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
                          message:
                            "Please enter a valid Bangladeshi phone number",
                        },
                      })}
                      type="tel"
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="01XXXXXXXXX"
                      aria-invalid={Boolean(errors.phone) || undefined}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    {...register("address", {
                      required: "Address is required",
                      minLength: { value: 5, message: "Address is too short" },
                    })}
                    type="text"
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Your address"
                    aria-invalid={Boolean(errors.address) || undefined}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
                  />
                  {errors.address && (
                    <p id="address-error" className="mt-1 text-sm text-red-600">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      NID Front Side
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-2 text-center">
                        {imagePreview.nid_front ? (
                          <div className="relative">
                            <img
                              src={imagePreview.nid_front}
                              alt="NID Front Preview"
                              className="max-h-40 mx-auto rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage("nid_front")}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                              aria-label="Remove NID front image"
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
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="text-xs text-gray-500">
                              PNG or JPG up to 2MB
                            </p>
                            <div className="flex text-sm text-gray-600 justify-center">
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
                      <div className="space-y-2 text-center">
                        {imagePreview.nid_back ? (
                          <div className="relative">
                            <img
                              src={imagePreview.nid_back}
                              alt="NID Back Preview"
                              className="max-h-40 mx-auto rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage("nid_back")}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                              aria-label="Remove NID back image"
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
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="text-xs text-gray-500">
                              PNG or JPG up to 2MB
                            </p>
                            <div className="flex text-sm text-gray-600 justify-center">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      aria-invalid={Boolean(errors.password) || undefined}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
                      }
                    />
                    {errors.password && (
                      <p
                        id="password-error"
                        className="mt-1 text-sm text-red-600"
                      >
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
                          value === formValues.password ||
                          "Passwords do not match",
                      })}
                      type="password"
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Confirm your password"
                      aria-invalid={
                        Boolean(errors.confirmPassword) || undefined
                      }
                      aria-describedby={
                        errors.confirmPassword
                          ? "confirmPassword-error"
                          : undefined
                      }
                    />
                    {errors.confirmPassword && (
                      <p
                        id="confirmPassword-error"
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-3 text-sm text-gray-700">
                    <input
                      id="agreeTerms"
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      {...register("agreeTerms", {
                        required: "You must agree to the Terms and Conditions",
                      })}
                      aria-invalid={Boolean(errors.agreeTerms) || undefined}
                    />
                    <span>
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setIsTermsOpen(true)}
                        className="text-green-600 hover:text-green-700 underline underline-offset-2"
                      >
                        Terms and Conditions
                      </button>{" "}
                      of KrishiBazar.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-sm text-red-600">
                      {errors.agreeTerms.message}
                    </p>
                  )}
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    )}
                    Create Account
                  </button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  By registering, you agree to our Islamic finance principles of
                  profit and loss sharing without interest (riba).
                </div>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
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
      </div>

      {isTermsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-title"
          className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsTermsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-xl shadow-xl ring-1 ring-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3
                id="terms-title"
                className="text-lg font-semibold text-gray-900"
              >
                KrishiBazar Terms and Conditions
              </h3>
              <button
                type="button"
                onClick={() => setIsTermsOpen(false)}
                className="rounded p-1 text-gray-500 hover:text-gray-700"
                aria-label="Close terms and conditions"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-4 text-sm text-gray-700">
              <p>
                Welcome to KrishiBazar. By creating an account, you agree to the
                following terms which are aligned with our project plan and
                Shariah-compliant principles.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Account Information: Provide accurate personal details (name,
                  email, phone, address) and valid NID images. You are
                  responsible for maintaining the confidentiality of your
                  account.
                </li>
                <li>
                  Shariah Compliance: All funding and profit-sharing follow
                  profit-and-loss (Mudarabah/Musharakah) models. No interest
                  (riba) is charged or paid on the platform.
                </li>
                <li>
                  Investments and Risks: Agricultural projects carry inherent
                  risks (weather, market, operational). Returns are not
                  guaranteed and depend on project performance.
                </li>
                <li>
                  Use of Uploaded Media: NID images are used solely for KYC
                  verification and will be handled per our privacy and data
                  protection policies.
                </li>
                <li>
                  Prohibited Use: Do not misuse the platform, attempt fraud, or
                  violate applicable laws and regulations.
                </li>
                <li>
                  Fees and Payouts: Platform service fees and profit
                  distributions, if applicable, are transparently communicated
                  in project details and payout schedules.
                </li>
                <li>
                  Dispute Resolution: We aim to resolve disputes amicably in
                  accordance with applicable laws and ethical standards.
                </li>
                <li>
                  Policy Updates: Terms and policies may be updated; material
                  changes will be communicated. Continued use constitutes
                  acceptance of the updated terms.
                </li>
              </ol>
              <p>
                If you have questions, please contact our support team before
                proceeding.
              </p>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
                onClick={() => setIsTermsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
