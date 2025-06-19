import React from 'react';
import { AuthLayout } from '../AuthLayout';
import { JoinForm } from '../components/JoinForm';
import { GoogleAuth } from '../components/GoogleAuth';

export const Join = () => {
  return (
    <AuthLayout>
      <JoinForm />

      <div className="divider text-gray-500 font-medium">OR</div>

      <div className="space-y-4 w-full">
        <GoogleAuth />
      </div>
    </AuthLayout>
  );
};
