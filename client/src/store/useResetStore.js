import { create } from 'zustand';

export const useResetStore = create((set) => ({
  resetEmail: null,
  setResetEmail: (resetEmail = null) => set({ resetEmail }),
  clearResetEmail: () => set({ resetEmail: null }),
}));
