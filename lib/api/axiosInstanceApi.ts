import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/",
});

export const proxy = axios.create({
  // 배포 이후에는 배포된 URL로 변경해야 함.
  baseURL: "https://linkbrary-9-99.vercel.app",
});

proxy.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
