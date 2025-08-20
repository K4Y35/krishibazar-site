"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import userServices from "../services/userServices";
import { useSiteContext } from "../context/SiteContext";

export const useLogin = () => {
  const router = useRouter();
  const {
    handleLogin,
    isUserApproved,
    getUserType,
    isFarmer,
    isInvestor,
    verifyOtp,
  } = useSiteContext();

  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const redirectByRole = (user) => {
    if (!user.is_approved) {
      router.push("/profile/pending");
      return;
    }
    if (user.userType == 1) {
      router.push("/profile/farmer");
    } else if (user.userType == 2) {
      router.push("/profile/investor");
    } else {
      router.push("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await handleLogin({
        phone: formData.phone,
        password: formData.password,
      });

      if (response?.success) {
        redirectByRole(response.user);
      } else {
        if (response?.message === "Please verify your phone number first") {
          // Prefer dedicated OTP page flow
          router.push(
            `/verify-otp?phone=${encodeURIComponent(formData.phone)}`
          );
          // If you want inline OTP instead, uncomment below
          // setOtpRequired(true);
        } else {
          setError(response?.message || "Login failed");
        }
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Network error. Please try again."
      );
      setError(
        err?.response?.data?.message || "Network error. Please try again."
      );
    }

    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await verifyOtp({
        phone: formData.phone,
        otp_code: otp,
      });

      if (response?.success) {
        // After successful verification, attempt login again
        await handleSubmit(new Event("submit"));
      } else {
        setError(response?.message || "OTP verification failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return {
    formData,
    handleChange,
    loading,
    error,
    otpRequired,
    otp,
    setOtp,
    handleSubmit,
    handleVerifyOTP,
  };
};