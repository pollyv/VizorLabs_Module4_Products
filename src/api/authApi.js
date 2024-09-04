import axios from "axios";

const API_URL = "https://dummyjson.com/auth";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для автоматического обновления токена
apiClient.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;

      // Связана ли с истекшим токеном
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refresh_token");
          if (refreshToken) {
            const response = await axios.post(`${API_URL}/refresh`, { token: refreshToken });

            // Обновляем
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refresh_token", response.data.refresh_token);

            // Новый токен
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;

            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          // Если не обновился, то отправляем на логин
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
);

export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
