import React from 'react';
import { useForm } from 'react-hook-form';
import { useResetStore } from '../../../store/useResetStore';

export const ForgotPassswordForm = () => {
  const { register, handleSubmit } = useForm();
  const { setResetEmail} = useResetStore();

  function handleFormSubmit(data) {
    setResetEmail(data.email);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />
        <p className="input-err"></p>
      </div>
      <button type="submit" className="primary-btn">
        Send Otp
      </button>
    </form>
  );
};
