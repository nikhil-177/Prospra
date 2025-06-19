import { create } from 'zustand';

const location = {
  '/join': {
    title: 'Create an Account',
    description: 'Join with us and explore more.',
  },
};

export const useAuthLayoutStore = create((set) => ({
  title: null,
  description: null,

  setMetaData: (pathname) => {
    const val = location[pathname] || location['/join'];
    set({ title: val.title, description: val.description });
  },
}));
