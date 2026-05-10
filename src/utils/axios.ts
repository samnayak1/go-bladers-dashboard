import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token refresh timer
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export const scheduleTokenRefresh = (expiresIn: number) => {
  // Clear existing timer
  if (refreshTimer) clearTimeout(refreshTimer);

  // Refresh 1 minute before expiry
  const refreshIn = (expiresIn - 60) * 1000;

  console.log(`Scheduling token refresh in ${refreshIn / 1000}s`);

  refreshTimer = setTimeout(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (!refreshToken || !accessToken) return;

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`,
        { token: refreshToken, accessToken }
      );

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("idToken", data.idToken);

      console.log("Token refreshed successfully");

      // Schedule next refresh
      scheduleTokenRefresh(data.expiresIn);
    } catch (err) {
      console.error("Proactive token refresh failed:", err);
      // Fall through to 401 handler as backup
    }
  }, refreshIn);
};

export const clearRefreshTimer = () => {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
};

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("idToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");

        if (!refreshToken || !accessToken) return Promise.reject(error);

        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`,
          { token: refreshToken, accessToken }
        );

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("idToken", data.idToken);

        // Reschedule refresh with new expiry
        scheduleTokenRefresh(data.expiresIn);

        originalRequest.headers.Authorization = `Bearer ${data.idToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        clearRefreshTimer();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("idToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;