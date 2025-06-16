import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../features/auth/AuthLayout';
import { Join } from '../features/auth/pages/Join';

export const AppRoutes = () => {
  const router = createBrowserRouter([
    { path: '/', element: <AuthLayout /> },
    { path: '/join', element: <Join /> },
  ]);

  return <RouterProvider router={router} />;
};
