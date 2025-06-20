import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

export const StepOne = () => {
  const [canViewPassword, setCanViewPassword] = useState(false);
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={clsx('input-hidden', errors.email && 'has-error')}
          placeholder="abc@gmail.com"
          {...register('email')}
        />
        {errors.email && <p className="inputs-err">{errors?.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            type={clsx(!canViewPassword && 'password',canViewPassword&& 'text')}
            id="password"
            className={clsx('input-hidden', errors.password && 'has-error')}
            {...register('password')}
          />
          <span
            className="text-gray-500 absolute top-1/2 right-0 -translate-1/2"
            onClick={() => setCanViewPassword(!canViewPassword)}
          >
            {!canViewPassword ? <Eye /> : <EyeOff />}
          </span>
        </div>
        {errors.password && (
          <p className="inputs-err">{errors?.password.message}</p>
        )}
      </div>
    </>
  );
};
