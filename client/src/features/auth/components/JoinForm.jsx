import { EyeClosed, EyeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuthLayoutStore } from '../../../store/useAuthLayoutStore';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

export const JoinForm = () => {
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [signupSteps, setSignupSteps] = useState(0);
  const { mode } = useAuthLayoutStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    unregister,
    control,
  } = useForm({
    defaultValues: { email: '', username: '', identifier: '', password: '' },
  });

  async function handleStepsOfSignUp() {
    if (mode === 'signin') return;

    const isValid = await trigger(['email', 'password']);
    if (!isValid) return;
    setSignupSteps(1);
  }

  useEffect(() => {
    if (mode === 'signin') {
      unregister('email');
      unregister('username');
    } else {
      unregister('identifier');
    }
  }, [mode]);

  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {signupSteps === 0 && mode === 'signup' ? (
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
            />
            <p className="input-err"></p>
          </div>
        ) : (
          ''
        )}

        {signupSteps === 0 && mode === 'signin' ? (
          <div>
            <label htmlFor="identifier">Email or Username</label>
            <input type="text" id="identifier" {...register('identifier')} />
            <p className="input-err"></p>
          </div>
        ) : (
          ''
        )}

        {signupSteps === 0 ? (
          <div>
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={canSeePassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-2 z-50 top-1/2 -translate-1/2"
                onClick={() => setCanSeePassword(!canSeePassword)}
              >
                {!canSeePassword ? <EyeClosed /> : <EyeIcon />}
              </button>
            </div>
            <p className="input-err"></p>
          </div>
        ) : (
          ''
        )}

        {signupSteps === 1 && mode === 'signup' ? (
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register('username')} />
            <p className="input-err"></p>
          </div>
        ) : (
          ''
        )}

        {signupSteps === 0 && (
          <button
            type={mode === 'signup' ? 'button' : 'submit'}
            className="primary-btn"
            onClick={handleStepsOfSignUp}
          >
            {mode === 'signup' ? 'Continue' : 'Sign In'}
          </button>
        )}

        {signupSteps === 1 && mode === 'signup' && (
          <button type="submit" className="primary-btn">
            Register
          </button>
        )}
      </form>
      <DevTool control={control} />
    </>
  );
};
