const API_BASE_URL = "http://localhost:4000/api";

const apiUrls = {
  base_url: API_BASE_URL,
  auth: {
    register: "/auth/register",
    verify_otp: "/auth/verify-otp",
    login: "/auth/login",
  },
  upload_image: {
    upload: "/upload",
    remove: "/delete-image",
  }
};

export default apiUrls;