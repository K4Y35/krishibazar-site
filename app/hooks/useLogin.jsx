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
    verifyOtp,
  } = useSiteContext();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await handleLogin({
        email: formData.email,
        password: formData.password,
      });


      if (response?.success) {
        router.push("/");
      } else {
        if (response?.message === "Please verify your phone number first") {
          router.push(
            `/verify-otp?email=${encodeURIComponent(formData.email)}`
          );
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
        email: formData.email,
        otp_code: otp,
      });

      if (response?.success) {
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
