import { create } from 'zustand';

const modeConfig = {
  signup: {
    title: 'Create an Account',
    subtitle: 'Join with us to explore more opportunities.',
  },
  signin: {
    title: 'Welcome Back!',
    subtitle: 'Sign in to continue your journey.',
  },
  verifyEmail: {
    title: 'Verify Your Email',
    subtitle: 'Please enter the OTP we sent to your email.',
  },
  forgotPassword1: {
    title: 'Forgot Password',
    subtitle: "Enter your email and we'll send you a reset code.",
  },
  forgotPassword2: {
    title: 'Check Your Email',
    subtitle: 'Enter the 6-digit code we sent to your inbox.',
  },
  forgotPassword3: {
    title: 'Create a new Password',
    subtitle: "Make sure it's strong and secure.",
  },
};

export const useAuthLayoutStore = create((set) => ({
  mode: 'signup',
  title: modeConfig.signup.title,
  subtitle: modeConfig.signup.subtitle,

  changeMode: (mode = 'signup') => {
    const config = modeConfig[mode] || modeConfig.signup;
    set({
      mode,
      title: config.title,
      subtitle: config.subtitle,
    });
  },

  changeHeadings: (title, subtitle) => set({ title, subtitle }),
}));
