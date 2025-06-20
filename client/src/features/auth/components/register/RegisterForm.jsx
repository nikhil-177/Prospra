import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { registerValidator } from '../../validations/registerValidation';
import { useRegister } from '../../hooks/useRegister';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../../../store/useAuthStore';
import { ChevronLeft } from 'lucide-react';

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const methods = useForm({
    resolver: zodResolver(registerValidator),
    defaultValues: { email: '', password: '', username: '' },
    mode: 'onTouched',
  });
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();

  const handleNextStep = async () => {
    const isValid = await methods.trigger(['email', 'password']);
    if (isValid) setStep(2);
  };

  const onFormSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data?.message || 'Registration successfull');

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
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2"
        onSubmit={methods.handleSubmit(onFormSubmit)}
      >
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}

        {step === 1 && (
          <button
            type="button"
            className="primary-btn"
            onClick={handleNextStep}
          >
            Continue
          </button>
        )}

        {step === 2 && (
          <div>
            <button type="submit" className="primary-btn" disabled={isPending}>
              {isPending ? <div className="loading" /> : 'Register'}
            </button>
            <button
              type="button"
              className="absolute top-4 left-3 min-[800px]:left-12"
              onClick={() => setStep(1)}
            >
              <ChevronLeft size={30} className='text-white min-[800px]:text-black'/>
            </button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};
