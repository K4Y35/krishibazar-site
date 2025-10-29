"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import userServices from "../services/userServices";
import { toast } from "react-toastify";

// Create the context
const SiteContext = createContext();

// Custom hook to use the context
export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSiteContext must be used within a SiteProvider");
  }
  return context;
};

// Provider component
export const SiteProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      const storedUser = localStorage.getItem("krishibazaar-user");
      const storedStatus = localStorage.getItem("krishibazaar-status");

      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (e) {
          // ignore corrupted user and clear below
        }
      } else if (storedStatus === "pending") {
        setUserStatus("pending");
        setIsAuthenticated(true);
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } catch {}
        }
      }
    } catch (error) {
      localStorage.removeItem("krishibazaar-user");
      localStorage.removeItem("krishibazaar-status");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const response = await userServices.login(credentials);

      if (response?.success) {
        const payload = response?.data || response;
        const { user: userData, userStatus: status } = payload || {};

        if (status === "pending") {
          setUserStatus("pending");
          setIsAuthenticated(true);
          localStorage.setItem("krishibazaar-status", "pending");
          if (userData) {
            setUser(userData);
            localStorage.setItem("krishibazaar-user", JSON.stringify(userData));
          }
          toast.success(response.message || "Login successful");
          return { success: true, user: userData };
        }

        if (userData) {
          localStorage.setItem("krishibazaar-user", JSON.stringify(userData));
          localStorage.removeItem("krishibazaar-status");

          setUser(userData);
          setIsAuthenticated(true);
          setUserStatus(null);

          toast.success(response.message || "Login successful");
          return { success: true, user: userData };
        }

        return { success: false, message: "Invalid login response" };
      } else {
        return { success: false, message: response?.message || "Login failed" };
      }
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message || "Network error. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await userServices.logout();
    } catch {}
    localStorage.removeItem("krishibazaar-user");
    localStorage.removeItem("krishibazaar-status");
    setUser(null);
    setIsAuthenticated(false);
    setUserStatus(null);

    router.push("/");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("krishibazaar-user", JSON.stringify(userData));
  };

  const verifyOtp = async (otpData) => {
    try {
      setLoading(true);
      const response = await userServices.verifyOtp(otpData);

      if (response?.success) {
        return { success: true, message: response.message };
      } else {
        return {
          success: false,
          message: response?.message || "OTP verification failed",
        };
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message || "Network error. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    userStatus,
    handleLogin,
    logout,
    verifyOtp,
    updateUser,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export default SiteContext;
