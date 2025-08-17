import apiUrls from "../config/apiUrls";
import request from "./httpServices";


const userServices = {
  register: async (data) => {
    return request.post(apiUrls.auth.register, data);
  },

  login: async (data) => {
    return request.post(apiUrls.auth.login, data);
  },

  verifyOtp: async (data) => {
    return request.post(apiUrls.auth.verify_otp, data);
  },

  imageUpload: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      return request.post(apiUrls.upload_image.upload, formData);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  removeImage: async (filename) => {
    return request.post(apiUrls.upload_image.remove, { filename: filename });
  },
};

export default userServices;
