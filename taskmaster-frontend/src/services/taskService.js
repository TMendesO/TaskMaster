import axios from "axios";

const API_URL = "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getTasks = async () => {
  return await axios.get(`${API_URL}/tasks`, {
    headers: getAuthHeaders(),
  });
};

export const createTask = async (task) => {
  return await axios.post(`${API_URL}/tasks`, task, {
    headers: getAuthHeaders(),
  });
};

export const updateTask = async (id, task) => {
  return await axios.put(`${API_URL}/tasks/${task.ID}`, task, {
    headers: getAuthHeaders(),
  });
};

export const deleteTask = async (ID) => {
  return await axios.delete(`${API_URL}/tasks/${ID}`, {
    headers: getAuthHeaders(),
  });
};
