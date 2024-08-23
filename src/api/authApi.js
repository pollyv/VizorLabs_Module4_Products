import axios from "axios";

const API_URL = "https://dummyjson.com/auth/login";

export const login = async (credentials) => {
  try {
    const response = await axios.post(API_URL, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
