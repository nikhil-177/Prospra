import { ChevronLeft, ChevronLeftCircle, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const JoinForm = () => {
  const [isModeJoin, setIsModeJoin] = useState(true);
  const [JoinModeLevel, setJoinModeLevel] = useState(2);
  const [canViewPassword, setCanViewPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', identifier: '', password: '', username: '' },
  });

  return (
    <>
      <form className="poppins flex flex-col gap-3 min-[800px]:relative">
        {isModeJoin && JoinModeLevel === 1 && (
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="input-primary"
              placeholder="name@email.com"
              {...register('email')}
            />
            <p>{errors.email?.message}</p>
          </div>
        )}
        {!isModeJoin && (
          <div>
            <label htmlFor="identifier">Email or Username</label>
            <input
              type="text"
              id="identifier"
              className="input-primary"
              {...register('identifier')}
            />
            <p>{errors.identifier?.message}</p>
          </div>
        )}

        {JoinModeLevel === 1 && (
          <div>
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={canViewPassword ? 'text' : 'password'}
                id="password"
                className="input-hidden"
                {...register('password')}
              />
              <button
                type="button"
                className="text-gray-600  absolute z-50 right-0 top-1/2 -translate-1/2"
                onClick={() => setCanViewPassword(!canViewPassword)}
              >
                {!canViewPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <p>{errors.password?.message}</p>
          </div>
        )}

        {isModeJoin && JoinModeLevel === 2 && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="input-primary"
              {...register('username')}
            />
            <p>{errors.username?.message}</p>
          </div>
        )}

        {isModeJoin ? (
          JoinModeLevel === 1 ? (
            <button
              type="button"
              className="primary-btn"
              onClick={() => setJoinModeLevel(2)}
            >
              Continue
            </button>
          ) : (
            <button type="submit" className="primary-btn">
              Register
            </button>
          )
        ) : (
          <button type="submit" className="primary-btn">
            Sign In{' '}
          </button>
        )}

        {JoinModeLevel === 2 && (
          <button
            className="text-white absolute top-4 min-[800px]:text-gray-600 min-[800px]:-top-16 min-[800px]:hover:bg-gray-200 p-2 "
            onClick={() => setJoinModeLevel(1)}
          >
            <ChevronLeft />
          </button>
        )}
      </form>
    </>
  );
};
