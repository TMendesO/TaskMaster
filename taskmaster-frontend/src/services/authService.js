import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const register = async (user) => {
  return await axios.post(`${API_URL}/register`, user);
};

export const login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  console.log(response);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const getCurrentUser = async () => {
  return await axios.get("http://localhost:8080/me", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};
