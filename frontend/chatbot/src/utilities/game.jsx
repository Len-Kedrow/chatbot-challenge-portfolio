// utilities/game.jsx has all utility functions for playing game. 
import axios from "axios";

// Base URL for the API
const apiUrl = "http://localhost:8000/api/v1/games/";

// Get the token from local storage
const getToken = () => {
  return localStorage.getItem("token");
};

// Set up axios with interceptors
const api = axios.create({
  baseURL: apiUrl,
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

// Utility functions for interacting with the API

export const getCurrentGame = async (userId, characterId) => {
  try {
    const response = await api.get(`game/${userId}/${characterId}/`);
    return response.data;
  } catch (error) {
    console.error("Error getting current game:", error);
    throw error;
  }
};

export const startGame = async (selectedEnvironment,characterName) => {
  try {
    const response = await api.post("game-state/", {
      character: characterName,
      theme: selectedEnvironment
    });
    return response.data;
  } catch (error) {
    console.error("Error starting game:", error);
    throw error;
  }
};

export const deleteGame = async (userId, characterName) => {
  try {
    const response = await api.delete(`game/${userId}/${characterName}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
};

export const getGameDict = async (userId, characterName) => {
  try {
    const response = await api.get(
      `game-dict/?user=${userId}&character=${characterName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching game dictionary:", error);
    throw error;
  }
};
