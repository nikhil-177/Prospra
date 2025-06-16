import { EyeClosed, EyeIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export const ResetPasswordForm = () => {
    const [seePassword1, setSeePassword1] = useState(false)
    const [seePassword2, setSeePassword2] = useState(false)
    const {register,handleSubmit} = useForm()


  return (
    <form onSubmit={handleSubmit((data)=>console.log(data))}>
      <div>
        <label htmlFor="newPassword">New password</label>
        <div className="relative">
          <input
            type={!seePassword1 ? 'password' : 'text'}
            id="newPassword"
            {...register('newPassword')}
          />
          <button
            type="button"
            className="absolute right-2 z-50 top-1/2 -translate-1/2"
            onClick={() => setSeePassword1((prev) => !prev)}
          >
            {!seePassword1 ? <EyeClosed /> : <EyeIcon />}
          </button>
        </div>
        <p className="input-err"></p>
      </div>

      <div>
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <div className="relative">
          <input
            type={!seePassword2 ? 'password' : 'text'}
            id="confirmNewPassword"
            {...register('confirmNewPassword')}
          />
          <button
            type="button"
            className="absolute right-2 z-50 top-1/2 -translate-1/2"
            onClick={() => setSeePassword2((prev) => !prev)}
          >
            {!seePassword2 ? <EyeClosed /> : <EyeIcon />}
          </button>
        </div>
        <p className="input-err"></p>
      </div>

      <button type="submit" className='primary-btn'>Reset Password</button>
    </form>
  );
}
