import React, { useEffect } from 'react';
import { AuthLayout } from '../AuthLayout';
import { useAuthLayoutStore } from '../../../store/useAuthLayoutStore';
import { ForgotPassswordForm } from '../components/ForgotPassswordForm';

export const ForgotPassword = () => {
  
  const { changeMode } = useAuthLayoutStore();

  useEffect(() => {
    changeMode('forgotPassword1');
  }, []);

  return (
    <AuthLayout>
      <ForgotPassswordForm />
    </AuthLayout>
  );
};
