import { create } from "zustand";
import { getSessionUserService, getUserDetailsService, loginUserService, refreshTokenService, type LoginRequest, type LoginResponse, type RefreshTokenRequest, type RefreshTokenResponse, type SessionUserResponse } from "../api/auth.api";

interface AuthState {
  user: SessionUserResponse | null;

  accessToken: string | null;
  idToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;

  loading: boolean;
  error: string | null;

  login: (payload: LoginRequest) => Promise<void>;
  refreshAuthToken: (payload: RefreshTokenRequest) => Promise<void>;

  fetchSessionUser: () => Promise<void>;
  getUserDetails: (username: string) => Promise<any>;

  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  accessToken: null,
  idToken: null,
  refreshToken: null,
  expiresIn: null,

  loading: false,
  error: null,

  login: async (payload) => {
    try {
      set({ loading: true, error: null });

      const response: LoginResponse = await loginUserService(payload);

      // Store in localStorage
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("idToken", response.idToken);

      set({
        accessToken: response.accessToken,
        idToken: response.idToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
      });

      await get().fetchSessionUser();
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Login failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  refreshAuthToken: async (payload) => {
    try {
      set({ loading: true, error: null });

      const response: RefreshTokenResponse = await refreshTokenService(payload);

      // Store in localStorage
      localStorage.setItem("accessToken", response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
      if(response.idToken){
        localStorage.setItem("idToken", response.idToken);
      }

      set({
        accessToken: response.accessToken,
        idToken: response.idToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
      });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Token refresh failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchSessionUser: async () => {
    try {
      set({ loading: true, error: null });
      const user = await getSessionUserService();
      set({ user });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch user" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getUserDetails: async (username: string) => {
    try {
      set({ loading: true, error: null });
      return await getUserDetailsService(username);
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch user details" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("idToken");
    set({
      user: null,
      accessToken: null,
      idToken: null,
      refreshToken: null,
      expiresIn: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));