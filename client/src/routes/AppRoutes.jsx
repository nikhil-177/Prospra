import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../features/auth/AuthLayout';
import { Join } from '../features/auth/pages/Join';
import { VerifyEmail } from '../features/auth/pages/VerifyEmail';
import { ForgotPassword } from '../features/auth/pages/ForgotPassword';
import { VerifyOtp } from '../features/auth/pages/VerifyOtp';
import { ResetPassword } from '../features/auth/pages/ResetPassword';

export const AppRoutes = () => {
  const router = createBrowserRouter([
    { path: '/', element: <AuthLayout /> },
    { path: '/join', element: <Join /> },
    { path: '/verify-email', element: <VerifyEmail /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/reset-password', element: <ResetPassword /> },
  ]);

  return <RouterProvider router={router} />;
};
