"use client";
import NavBar from "../components/NavBar";
import VerifyOtpPage from "../components/pages/VerifyOtpPage";

export default function VerifyOtp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600">
        <NavBar />
      </div>
      <VerifyOtpPage />
    </div>
  );
}
