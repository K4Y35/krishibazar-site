"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import userServices from "../../services/userServices";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await userServices.verifyOtp({ email, otp_code: otp });
      if (res?.success) {
        setSuccess(res?.message || "Email verified successfully");
        setTimeout(() => router.push("/login"), 1000);
      } else {
        setError(res?.message || "OTP verification failed");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter your email first");
      return;
    }
    try {
      setResending(true);
      const res = await userServices.resendOtp({ email });
      if (res?.success) {
        setSuccess(res?.message || "OTP resent successfully");
      } else {
        setError(res?.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="tel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 tracking-widest text-center"
              placeholder="••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6 || !email}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending || !email}
              className="mt-3 text-sm text-green-600 hover:text-green-500 disabled:opacity-50"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
