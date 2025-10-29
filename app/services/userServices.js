import apiUrls from "../config/apiUrls";
import request from "./httpServices";


const userServices = {
  register: async (data) => {
    return request.post(
      `/proxy?path=${encodeURIComponent(apiUrls.auth.register)}`,
      data
    );
  },

  login: async (data) => {
    // Performs backend login and sets HttpOnly cookie if approved
    return request.post(`/user/auth/login`, data);
  },

  logout: async () => {
    return request.post(`/user/auth/logout`, {});
  },

  verifyOtp: async (data) => {
    return request.post(
      `/proxy?path=${encodeURIComponent(apiUrls.auth.verify_otp)}`,
      data
    );
  },

  resendOtp: async (data) => {
    return request.post(
      `/proxy?path=${encodeURIComponent(apiUrls.auth.resend_otp)}`,
      data
    );
  },

  requestPasswordReset: async (data) => {
    return request.post(
      `/proxy?path=${encodeURIComponent(apiUrls.auth.request_password_reset)}`,
      data
    );
  },

  resetPassword: async (data) => {
    return request.post(
      `/proxy?path=${encodeURIComponent(apiUrls.auth.reset_password)}`,
      data
    );
  },

  imageUpload: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      return request.post(
        `/proxy?path=${encodeURIComponent(apiUrls.upload_image.upload)}`,
        formData
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  removeImage: async (filename) => {
    return request.post(`/proxy?path=${encodeURIComponent(apiUrls.upload_image.remove)}`, { filename: filename });
  },

  getUserDetails: async (id) => {
    return request.get(`/proxy?path=${encodeURIComponent(apiUrls.user.get_user_details + "/" + id)}`);
  },

  changePassword: async (data) => {
    return request.post(`/proxy?path=${encodeURIComponent(apiUrls.user.change_password)}`, data);
  },
};

export default userServices;
