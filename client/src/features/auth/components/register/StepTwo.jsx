import { useFormContext } from 'react-hook-form';
import { clsx } from 'clsx';

export const StepTwo = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          id="username"
          className={clsx('input-hidden', errors.username && 'has-error')}
          {...register('username')}
        />
        {errors.username && (
          <p className="inputs-err">{errors?.username.message}</p>
        )}
      </div>
      <div className='text-gray-400 font-medium mb-2'>
        <p>Choose your username wisely as you cannot change it later.</p>
      </div>
    </>
  );
};
