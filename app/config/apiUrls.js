const API_BASE_URL = "http://localhost:4000";

const apiUrls = {
  base_url: API_BASE_URL,
  auth: {
    register: "/user/auth/register",
    verify_otp: "/user/auth/verify-otp",
    login: "/user/auth/login",
    request_password_reset: "/user/auth/request-password-reset",
    reset_password: "/user/auth/reset-password",
    resend_otp: "/user/auth/resend-otp",
  },
  upload_image: {
    upload: "shared/upload-media",
    remove: "shared/delete-image",
  },
  user: {
    get_user_details: "/user/get-user-details",
    change_password: "/user/change-password",
  },
};

export default apiUrls;
