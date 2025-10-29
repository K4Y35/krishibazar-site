"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSiteContext } from "../context/SiteContext";
import userServices from "../services/userServices";

export const useProfile = () => {
  const { user, isAuthenticated, loading, logout, userStatus } = useSiteContext();
  const router = useRouter();

  const [changing, setChanging] = useState(false);
  const [changeError, setChangeError] = useState("");
  const [changeSuccess, setChangeSuccess] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const normalizedUser = useMemo(() => {
    if (Array.isArray(user)) {
      return user[0] || null;
    }
    return user;
  }, [user]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!normalizedUser?.id) return;
      try {
        await userServices.getUserDetails(normalizedUser.id);
      } catch {
        // ignore
      }
    };
    fetchUserDetails();
  }, [normalizedUser?.id]);

  const isPending = userStatus === "pending" || !normalizedUser?.is_approved;
  const userTypeLabel =
    normalizedUser?.usertype === 1
      ? "Farmer"
      : normalizedUser?.usertype === 2
      ? "Investor"
      : "User";

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setChanging(true);
    setChangeError("");
    setChangeSuccess("");

    if (!passwordForm.new_password || passwordForm.new_password.length < 6) {
      setChangeError("New password must be at least 6 characters.");
      setChanging(false);
      return;
    }
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setChangeError("Passwords do not match.");
      setChanging(false);
      return;
    }

    try {
      await userServices.changePassword({
        id: normalizedUser?.id,
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      });
      setChangeSuccess("Password updated successfully.");
      setPasswordForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setChangeError(err?.response?.data?.message || "Failed to change password.");
    } finally {
      setChanging(false);
    }
  };

  return {
    // from context
    loading,
    isAuthenticated,
    logout,
    userStatus,
    // derived
    normalizedUser,
    isPending,
    userTypeLabel,
    // change password state/actions
    changing,
    changeError,
    changeSuccess,
    passwordForm,
    setPasswordForm,
    handlePasswordChange,
  };
};

export default useProfile;


