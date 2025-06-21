import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isRefreshing: false,

  setUser: (user = null) => set({ user }),
  setToken: (token = null) => set({ token }),
  setIsRefreshing: (val) => set({ isRefreshing: val }),
  clearAuth: () => set({ user: null, token: null }),
}));
