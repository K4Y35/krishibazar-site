import axios from "axios";
import apiUrls from "../config/apiUrls";


const instance = axios.create({
  // Route all requests through Next.js API routes
  baseURL: "/api",
  timeout: 500000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Don't set Content-Type for FormData - let browser set it automatically
    const headers = { ...config.headers };
    if (config.data instanceof FormData) {
      delete headers["Content-Type"];
    }

    return {
      ...config,
      headers,
      withCredentials: true,
    };
  },
    (requestError) => {
      console.log(requestError?.response, "requestError");
      return requestError;
    }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 403) {
      // window.history.back();
    }
    if (error?.response?.status === 401) {
      try {
        localStorage.removeItem("krishibazaar-user");
        localStorage.removeItem("krishibazaar-status");
        localStorage.removeItem("krishibazaar-user-id");
      } catch {}
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// console.log(process.env.API_BASE_URL);
const responseBody = (response) => response.data;

const requests = {
  get: (url) => instance.get(url).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  put: (url, body) => instance.put(url, body).then(responseBody),
  delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;