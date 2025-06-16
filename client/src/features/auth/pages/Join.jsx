import React from 'react';
import { AuthLayout } from '../AuthLayout';
import { JoinForm } from '../components/JoinForm';
import { useAuthLayoutStore } from '../../../store/useAuthLayoutStore';

export const Join = () => {
  const { changeMode, changeHeadings, mode } = useAuthLayoutStore();


  function handleJoinMode() {
    const currMode = mode === 'signup' ? 'signin' : 'signup';
    changeMode(currMode);

    currMode === 'signin'
      ? changeHeadings('Sign in to your Account')
      : changeHeadings();
  }
  
  return (
    <AuthLayout>
      <JoinForm />

      <div className="flex gap-2 my-2">
        <span>
          {mode === 'signup'
            ? "Don't have an Account?"
            : 'Already have an Account?'}
        </span>
        <button className="link" onClick={handleJoinMode}>
          {mode === 'signup' ? 'Sign in' : 'Join here'}
        </button>
      </div>

      <div className="divider">OR</div>

      <div>
        <span>Continue with google</span>
      </div>
    </AuthLayout>
  );
};
