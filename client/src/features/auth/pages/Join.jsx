import React, { useEffect, useState } from 'react';
import { AuthLayout } from '../AuthLayout';
import { GoogleAuth } from '../components/GoogleAuth';
import { RegisterForm } from '../components/register/RegisterForm';
import { LoginForm } from '../components/login/LoginForm';
import { useAuthLayoutStore } from '../../../store/authLayoutStore';

export const Join = () => {
  const [isAuthModeJoin, setIsAuthModeJoin] = useState(true);
  const { setMetaData } = useAuthLayoutStore();

  useEffect(() => {
    const val = isAuthModeJoin ? 'register' : 'login';
    setMetaData(val);
  }, [isAuthModeJoin]);

  return (
    <AuthLayout>
      <div className="poppins">
        {isAuthModeJoin ? <RegisterForm /> : <LoginForm />}
        <div className="divider font-medium">OR</div>
        <GoogleAuth />
        <div className='mt-5 flex justify-between'>
          <span>
            {!isAuthModeJoin
              ? "Don't have an Account ?"
              : 'Already have an Account ?'}
          </span>
          <button
            type="button"
            onClick={() => setIsAuthModeJoin(!isAuthModeJoin)}
            className="link"
          >
            {!isAuthModeJoin ? 'Join here' : 'Sign in'}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
