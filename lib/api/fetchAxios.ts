import axiosInstance from "./axiosInstanceApi";

const fetchAxios = async (endpoint: string, token: string) => {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default fetchAxios;
