import { create } from "zustand";
import { api } from "../api/clients";
import { AxiosError } from "axios";

type User = {
  id: number;
  username: string;
  isAdmin: boolean;
};

type AuthStore = {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await api.get<User>("/auth/me");
      set({ user: res.data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/login", { username, password });
      await useAuthStore.getState().fetchUser();
      set({ loading: false });
      return true;
    } catch (err) {
      const error = err as AxiosError;
      set({
        error: (error.response?.data as string) || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  signup: async (username, password) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/signup", { username, password });
      await useAuthStore.getState().fetchUser();
      set({ loading: false });
      return true;
    } catch (err) {
      const error = err as AxiosError;
      set({
        error: (error.response?.data as string) || "Signup failed",
        loading: false,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed", err);
    }
    set({ user: null });
    window.location.href = "/auth";
  }
}));
