import { create } from 'zustand';

export const useLogoutUiStore = create((set) => ({
  showLogoutModal: false,

  openLogoutModal: () => set({ showLogoutModal: true }),
  closeLogoutModal: () => set({ showLogoutModal: false }),
}));
