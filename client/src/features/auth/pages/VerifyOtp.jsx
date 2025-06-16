import React, { useEffect } from 'react';
import { AuthLayout } from '../AuthLayout';
import { useAuthLayoutStore } from '../../../store/useAuthLayoutStore';
import { VerifyOtpForm } from '../components/VerifyOtpForm';

export const VerifyOtp = () => {
  const { changeMode } = useAuthLayoutStore();

  useEffect(() => {
    changeMode('forgotPassword2');
  }, []);

  return (
    <AuthLayout>
      <VerifyOtpForm />
    </AuthLayout>
  );
};
