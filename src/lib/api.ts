import axios, { AxiosRequestHeaders } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }

    const headers = config.headers as AxiosRequestHeaders;
    headers.Authorization = `Bearer ${token}`;
    config.headers = headers;
  }

  return config;
});

export default api;