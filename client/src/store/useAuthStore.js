import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUser: (user = null) => set({ user }),
  setToken: (token = null) => set({ token }),
  resetAuth: () => set({ user: null, token: null }),
}));
