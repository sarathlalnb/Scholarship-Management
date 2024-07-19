import axios from "axios";

const baseInstance = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: [API_URL],
    timeout: 5000,
    headers,
  });
};

const authInstance = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const authToken = sessionStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }
  return axios.create({
    baseURL: [API_URL],
    timeout: 25000,
    headers,
  });
};

const MauthInstance = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const authToken = sessionStorage.getItem("token");
  let headers = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }
  return axios.create({
    baseURL: [API_URL],
    timeout: 25000,
    headers,
  });
};

export default { baseInstance, authInstance, MauthInstance };
