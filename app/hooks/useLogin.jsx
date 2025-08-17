"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userServices from "../services/userServices";

export const useLogin = () => {
  const router = useRouter();

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
      const response = await userServices.login({
        phone: formData.phone,
        password: formData.password,
      });

      console.log(response.data.user);
      if (response?.success) {
        const token = response.data?.token;
        const user = response.data?.user;
        if (token && user) {
          localStorage.setItem("krishibazaar-token", token);
          localStorage.setItem("krishibazaar-user", JSON.stringify(user));
        }
        redirectByRole(user);
      } else {
        if (response?.message === "Please verify your phone number first") {
          // Prefer dedicated OTP page flow
          router.push(`/auth/verify-otp?phone=${encodeURIComponent(formData.phone)}`);
          // If you want inline OTP instead, uncomment below
          // setOtpRequired(true);
        } else {
          setError(response?.message || "Login failed");
        }
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Network error. Please try again.");
    }

    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await userServices.verifyOtp({
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