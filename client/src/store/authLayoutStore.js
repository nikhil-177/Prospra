import { create } from 'zustand';

const name = {
  register: {
    title: 'Create an Account',
    description: 'Join with us and explore more.',
  },
  login: {
    title: 'Sign in to your Account',
    description: "Good to see you again — let's get back to work.",
  },
};

export const useAuthLayoutStore = create((set) => ({
  title: null,
  description: null,

  setMetaData: (setMetaDataOf) => {
    const val = name[setMetaDataOf] || name['register'];
    set({ title: val.title, description: val.description });
  },
}));
