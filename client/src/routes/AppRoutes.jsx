import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../features/auth/AuthLayout';
import { Join } from '../features/auth/pages/Join';
import { VerifyEmail } from '../features/auth/pages/VerifyEmail';

export const AppRoutes = () => {
  const router = createBrowserRouter([
    { path: '/', element: <AuthLayout /> },
    { path: '/join', element: <Join /> },
    { path: '/verify-email', element: <VerifyEmail /> },
  ]);

  return <RouterProvider router={router} />;
};
