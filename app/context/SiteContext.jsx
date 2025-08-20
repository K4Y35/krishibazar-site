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
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Initialize user state from localStorage on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      const storedToken = localStorage.getItem("krishibazaar-token");
      const storedUser = localStorage.getItem("krishibazaar-user");

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      // Clear corrupted data
      localStorage.removeItem("krishibazaar-token");
      localStorage.removeItem("krishibazaar-user");
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const response = await userServices.login(credentials);
      console.log(response, "response");

      if (response?.success) {
        const { token: newToken, user: userData } = response.data;

        // Store in localStorage
        localStorage.setItem("krishibazaar-token", newToken);
        localStorage.setItem("krishibazaar-user", JSON.stringify(userData));

        // Update state
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);

        toast.success(response.message || "Login successful");
        return { success: true, user: userData };
      } else {
        return { success: false, message: response?.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message || "Network error. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("krishibazaar-token");
    localStorage.removeItem("krishibazaar-user");

    // Clear state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    // Redirect to home
    router.push("/");
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("krishibazaar-user", JSON.stringify(userData));
  };

  // Redirect user based on their role and approval status
  const redirectByRole = () => {
    if (!user) {
      router.push("/");
      return;
    }

    if (!isUserApproved()) {
      router.push("/profile/pending");
      return;
    }

    if (isFarmer()) {
      router.push("/profile/farmer");
    } else if (isInvestor()) {
      router.push("/profile/investor");
    } else {
      router.push("/");
    }
  };

  // Verify OTP
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
    // State
    user,
    token,
    loading,
    isAuthenticated,

    // Actions
    handleLogin,
    logout,
    verifyOtp,
    updateUser,
    redirectByRole,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export default SiteContext;
