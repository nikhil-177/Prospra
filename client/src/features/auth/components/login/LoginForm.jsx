import clsx from 'clsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../hooks/useLogin';
import { loginValidator } from '../../validations/loginValidation';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [canViewPassword, setCanViewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginValidator),
    defaultValues: { identifier: '', password: '' },
    mode: 'onTouched',
  });
  const { mutate, isPending } = useLogin();
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  function onFormSubmit(data) {
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data?.message || 'Login successfull');

        setUser(data?.data);
        setToken(data?.accessToken);

        setTimeout(() => {
          navigate(-1);
        }, 3500);
      },
      onError: (error) => {
        if (error.response?.data?.errors) {
          error.response.data.errors.map((e) => {
            methods.setError(e.field, {
              type: 'server',
              message: e.message,
            });
          });
        } else {
          toast.error(
            error.response.data.message ||
              'Something went wrong , Please try again later',
            { autoClose: 5000 }
          );
        }
      },
    });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label htmlFor="identifier">Email or Username</label>
        <input
          type="text"
          id="identifier"
          className={clsx('input-hidden', errors.identifier && 'has-error')}
          placeholder="abc@gmail.com"
          {...register('identifier')}
        />
        {errors.identifier && (
          <p className="inputs-err">{errors?.identifier.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            type={clsx(
              !canViewPassword && 'password',
              canViewPassword && 'text'
            )}
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

      <button type="submit" className="primary-btn" disabled={isPending}>
        {isPending ? <div className="loading" /> : 'Sign In'}
      </button>
    </form>
  );
};
