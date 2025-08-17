import axios from "axios";
import apiUrls from "../config/apiUrls";


const instance = axios.create({
  baseURL: `${apiUrls.base_url}`,
  timeout: 500000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("krishibazaar-token");
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
  },
  (requestError) => {
    console.log(requestError.response, "requestError");
    // Here probably need to have a return
    if (requestError.response.status == 401) {
      // navigation
    } else {
      return requestError;
    }
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      // toast.error(error.response.data?.message || "You do not have permission!");
      // window.history.back();
    }
    if (error?.response?.status === 401) {
      localStorage.removeItem("krishibazaar-user");
      localStorage.removeItem("krishibazaar-token");
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