import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Join } from '../features/auth/pages/Join';

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/join',
      element: <Join />,
    },
  ]);

  return <RouterProvider router={router} />;
};
