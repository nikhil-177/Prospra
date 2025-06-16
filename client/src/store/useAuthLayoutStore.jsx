import { create } from 'zustand';

export const useAuthLayoutStore = create((set) => ({
  mode: 'signup',
  title: 'Create an Account',
  subtitle: 'Join with us to explore more opportunities',
  changeMode: (mode = 'signup') => set({ mode }),
  changeHeadings: (
    title = 'Create an Account',
    subtitle = 'Join with us to explore more opportunities'
  ) => set({ title, subtitle }),
}));
