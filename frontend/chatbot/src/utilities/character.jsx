// utilities/character.jsx
import axios from "axios";

// Get the token from local storage
const getToken = () => {
  return localStorage.getItem("token");
};

// Set up axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/characters/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllCharacters = async () => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const addCharacter = async (characterPayload) => {
  try {
    const response = await api.post("", characterPayload);
    if (response.status === 201) {
      console.log("Character created successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Error creating character:", error);
    throw error;
  }
};

export const updateCharacter = async (
  id,
  name,
  strength,
  charisma,
  intelligence
) => {
  try {
    const response = await api.put(`${id}/`, {
      name,
      strength,
      charisma,
      intelligence,
    });
    if (response.status === 200) {
      console.log("Character updated successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Error updating character:", error);
    throw error;
  }
};

export const getCharacter = async (id) => {
  try {
    const response = await api.get(`${id}/`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("Character not found.");
    } else {
      console.error("An error occurred:", error);
    }
    throw error;
  }
};

export const deleteCharacter = async (id) => {
  try {
    const response = await api.delete(`${id}/`);
    if (response.status === 204) {
      console.log("Character deleted successfully");
    } else {
      console.error("Failed to delete character");
    }
  } catch (error) {
    console.error("Error deleting character:", error);
    throw error;
  }
};

export default api;
