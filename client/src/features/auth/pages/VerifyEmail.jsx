import React, { useEffect } from 'react';
import { AuthLayout } from '../AuthLayout';
import { useAuthLayoutStore } from '../../../store/useAuthLayoutStore';
import { VerifyEmailForm } from '../components/VerifyEmailForm';

export const VerifyEmail = () => {
  const { changeMode } = useAuthLayoutStore();
  useEffect(() => {
    changeMode('verifyEmail');
  }, []);

  return (
    <AuthLayout>
      <VerifyEmailForm />

      <button className="self-start my-4 p-2  rounded hover:bg-gray-200 active:bg-gray-300 transition">
        Skip for now
      </button>
    </AuthLayout>
  );
};
